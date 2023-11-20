const express = require("express");
const userRouter = require("./src/controllers/users");
const productsRouter = require("./src/controllers/products");

const app = express();

// For post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);
app.use("/api/products", productsRouter);

module.exports = app;
