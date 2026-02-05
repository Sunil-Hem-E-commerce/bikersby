const { pool } = require("./utils/postgres");

const migrate = async () => {
  const client = await pool.connect();
  try {
    console.log("Starting migration...");

    // 1. Add role column to users
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';
    `);
    console.log("Added role column to users.");

    // 2. Create orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        status TEXT DEFAULT 'pending',
        payment_status TEXT DEFAULT 'pending',
        payment_method TEXT DEFAULT 'cod',
        shipping_address TEXT,
        contact_number TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log("Created orders table.");

    // 3. Create order_items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        image TEXT,
        color TEXT
      );
    `);
    console.log("Created order_items table.");

    // 4. Create payments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        gateway TEXT NOT NULL,
        transaction_id TEXT,
        amount INTEGER NOT NULL,
        status TEXT DEFAULT 'pending',
        response_json TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    console.log("Created payments table.");

    console.log("Migration completed successfully.");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    client.release();
    // Close the pool to exit the script
    await pool.end();
  }
};

migrate();
