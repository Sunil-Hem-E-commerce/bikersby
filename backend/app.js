const client = require("./connection.js");
const express = require("express");
const middleware = require("./utils/middleware.js");
const logger = require("./utils/logger.js");

const userRouter = require("./routers/users.js");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

client
  .connect()
  .then(() => {
    logger.info("Connected to DataBase!!");
  })
  .catch((error) => {
    logger.error("Error while connecting to DataBase", error);
  });

app.listen(3001, () => {
  console.log("Sever is now listening at port 3001");
});

app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
