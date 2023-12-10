const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");

console.log("Connecting to ", config.mongoUrl);

let db = mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error occured while connecting to DB.", error);
  });

module.exports = db;
