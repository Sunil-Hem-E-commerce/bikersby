// contains configuration of database only.
require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    migrationStorageTableName: process.env.DB_SEQUELIZE_META,
    // using render url:
    url: process.env.DB_URL,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_PORT,
    dialect: "postgres",
    migrationStorageTableName: process.env.DB_SEQUELIZE_META,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PRODUCTION_NAME,
    host: process.env.DB_PORT,
    dialect: "postgres",
    migrationStorageTableName: process.env.DB_SEQUELIZE_META,
  },
};
