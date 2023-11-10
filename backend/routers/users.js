const userRouter = require("express").Router();
const client = require("../connection.js");

userRouter.get("/", (req, res) => {
  client.query(`Select * from users`, (err, resDB) => {
    if (!err) {
      res.send(resDB.rows);
    } else {
      console.log("error", err.message);
    }
    client.end;
  });
});

module.exports = userRouter;
