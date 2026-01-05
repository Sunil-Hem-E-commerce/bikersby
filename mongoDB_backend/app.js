const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const compression = require("compression");
const helmet = require("helmet");
const config = require("./utils/config");

const file = require("express-fileupload");
const indexRouter = require("./routes");

require("./script");
require("./models/");

const allowed = new Set([...(config.CORS_ORIGINS || []), config.FRONTEND_ORIGIN].filter(Boolean));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowed.size === 0 || allowed.has(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(file({ useTempFiles: true }));

app.use("/", express.static("dist"));
app.use("/api", indexRouter);
app.use("/admin", express.static("public"));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
