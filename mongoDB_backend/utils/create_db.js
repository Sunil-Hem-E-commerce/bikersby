const { Client } = require("pg");
const config = require("./config");

const createDb = async () => {
  const client = new Client({
    host: config.POSTGRES_SERVER || "localhost",
    port: config.POSTGRES_PORT ? Number(config.POSTGRES_PORT) : 5432,
    user: config.POSTGRES_USER,
    password: config.POSTGRES_PASSWORD,
    database: "postgres", // Connect to default DB
  });

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${config.POSTGRES_DB}'`
    );
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${config.POSTGRES_DB}"`);
      console.log(`Database ${config.POSTGRES_DB} created.`);
    } else {
      console.log(`Database ${config.POSTGRES_DB} already exists.`);
    }
  } catch (err) {
    console.error("Error creating database:", err);
  } finally {
    await client.end();
  }
};

createDb();
