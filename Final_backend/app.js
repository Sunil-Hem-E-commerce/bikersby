const express = require("express");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const addressRouter = require("./controllers/address");
require("./models/");

const app = express();

// For post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/", usersRouter);
app.use("/api/login/", loginRouter);
app.use("/api/address/", addressRouter);

app.get("/", (req, res) => {
  res.send("Hello there!!!");
});

module.exports = app;
