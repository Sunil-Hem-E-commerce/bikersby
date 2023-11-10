const client = require("./connection.js");
const express = require("express");
const middleware = require("./utils/middleware.js");

const userRouter = require("./routers/users.js");

const app = express();

app.listen(3001, () => {
  console.log("Sever is now listening at port 3001");
});

app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

client.connect();
