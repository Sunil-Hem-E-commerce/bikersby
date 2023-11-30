const express = require("express");
const app = express();
require("./models/");

// For post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Bikers!!");
});

module.exports = app;
