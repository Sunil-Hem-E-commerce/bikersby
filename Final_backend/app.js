const express = require("express");
require("./models/");
const usersRouter = require("./controllers/users");

const app = express();

// For post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

app.get("/api/users/", usersRouter);

module.exports = app;
