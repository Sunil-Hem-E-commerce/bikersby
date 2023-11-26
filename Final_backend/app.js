const express = require("express");
const usersRouter = require("./controllers/users");
require("./models/");

const app = express();

// For post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

module.exports = app;
