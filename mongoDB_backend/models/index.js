const mongoose = require("mongoose");
const config = require("../utils/config");
const logger = require("../utils/logger");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connect = async () => {
  try {
    await mongoose.connect(config.mongoUrl, { serverSelectionTimeoutMS: 5000 });
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Primary MongoDB connection failed.", error);
    if (config.MONGODB_URI && config.mongoUrl !== config.MONGODB_URI) {
      try {
        await mongoose.connect(config.MONGODB_URI, {
          serverSelectionTimeoutMS: 5000,
        });
        logger.info("Connected to local MongoDB");
        return;
      } catch (e) {
        logger.error("Local MongoDB connection failed.", e);
      }
    }
    const mem = await MongoMemoryServer.create();
    const uri = mem.getUri();
    await mongoose.connect(uri);
    logger.info("Connected to in-memory MongoDB");
  }
};

connect();

module.exports = mongoose.connection;
