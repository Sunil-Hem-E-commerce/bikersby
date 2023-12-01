const express = require("express");
const app = express();
require("./models/");
const indexRouter = require("./routes");

// For post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

module.exports = app;
