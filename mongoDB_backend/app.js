const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");

const file = require("express-fileupload");
const indexRouter = require("./Routes");

require("./script");
require("./models/");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(file({ useTempFiles: true }));

app.use("/", indexRouter);
app.use("/admin", express.static("public"));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
