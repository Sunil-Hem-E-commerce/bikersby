const client = require("./connection.js");
const express = require("express");
const middleware = require("./utils/middleware.js");

const app = express();

app.listen(3001, () => {
  console.log("Sever is now listening at port 3001");
});

app.get("/users", (req, res) => {
  client.query(`Select * from users`, (err, resDB) => {
    if (!err) {
      res.send(resDB.rows);
    } else {
      console.log("error", err.message);
    }
    client.end;
  });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

client.connect();
