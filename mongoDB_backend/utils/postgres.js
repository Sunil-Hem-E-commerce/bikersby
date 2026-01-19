const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
  host: config.POSTGRES_SERVER || "localhost",
  port: config.POSTGRES_PORT ? Number(config.POSTGRES_PORT) : 5432,
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
});

let dbInstance;

const initDb = async () => {
  if (dbInstance) {
    return dbInstance;
  }

  const { drizzle } = await import("drizzle-orm/node-postgres");
  const schema = await import("../drizzle/schema.js");

  const db = drizzle(pool, { schema });

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      username TEXT,
      password_hash TEXT,
      address TEXT,
      is_email_verified BOOLEAN DEFAULT FALSE,
      email_verification_token TEXT,
      provider TEXT,
      provider_id TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      company TEXT,
      price INTEGER NOT NULL,
      discounted_price INTEGER,
      description TEXT,
      category TEXT,
      featured BOOLEAN DEFAULT FALSE,
      stock INTEGER DEFAULT 0,
      reviews INTEGER DEFAULT 0,
      stars INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS images (
      id SERIAL PRIMARY KEY,
      url TEXT UNIQUE NOT NULL,
      width INTEGER DEFAULT 1080,
      height INTEGER DEFAULT 650,
      size INTEGER DEFAULT 1080,
      type TEXT DEFAULT 'image/png',
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS colors (
      id SERIAL PRIMARY KEY,
      hex TEXT NOT NULL,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS cart_items (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER NOT NULL DEFAULT 1,
      status TEXT DEFAULT 'cart',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  dbInstance = db;
  return dbInstance;
};

module.exports = {
  pool,
  initDb,
};
