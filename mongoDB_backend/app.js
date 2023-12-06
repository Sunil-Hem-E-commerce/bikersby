const config = require("./utils/config");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const productsRouter = require("./controllers/products");
const loginRouter = require("./controllers/login");
const productAdminRouter = require("./controllers/product_admin");

require("./script");

console.log("Connecting to ", config.mongoUrl);

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error occured while connecting to DB.", error);
  });

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/products", productsRouter);
app.use("/admin/products", productAdminRouter);
// code to serve the public static files;

app.use("/admin", express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
