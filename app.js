const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("tiny"));
app.use(express.json());
require("dotenv").config();
const { url } = require("./utils/config");
const mongoose = require("mongoose");
const productRouter = require("./controller/products");
const { api } = require("./utils/config");

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected Successfully to MongoDB!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB!");
  });

app.use(`${api}`, productRouter);

module.exports = app;
