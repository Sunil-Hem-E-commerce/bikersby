const { defineConfig } = require("drizzle-kit");
require("dotenv").config();

module.exports = defineConfig({
  schema: "./drizzle/schema.js",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.POSTGRES_SERVER || "localhost",
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    ssl: false,
  },
});
