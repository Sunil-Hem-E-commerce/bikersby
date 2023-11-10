require("dotenv").config();

const PORT = process.env.PORT;
const LOCAL_USER = process.env.LOCAL_POSTGRES_USER;
const LOCAL_USER_PASSWORD = process.env.LOCAL_POSTGRES_USER_PASSWORD;
const LOCAL_DB = process.env.LOCAL_DB;

module.exports = {
  PORT,
  LOCAL_USER,
  LOCAL_USER_PASSWORD,
  LOCAL_DB,
};
