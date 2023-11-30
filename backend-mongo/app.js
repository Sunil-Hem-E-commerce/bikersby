const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const { url } = require("./utils/config");
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const productRouter = require("./controller/products");
const userRouter = require("./controller/login");
const categoryRouter = require("./controller/categories");
const { api } = require("./utils/config");
const validateTokenHandler = require("./middleware/validateTokenHandler");

//! Middleware
app.use(morgan("tiny"));
app.use(express.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected Successfully to MongoDB!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB!");
  });

app.use(validateTokenHandler);
app.use(`${api}/products`, productRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/category`, categoryRouter);
app.use(errorHandler);

module.exports = app;
