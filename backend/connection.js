const { Client } = require("pg");
const config = require("./utils/config");

const client = new Client({
  host: "localhost",
  user: config.LOCAL_USER,
  port: config.PORT,
  password: config.LOCAL_USER_PASSWORD,
  database: config.LOCAL_DB,
});

module.exports = client;
