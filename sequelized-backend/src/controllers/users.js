const usersRouter = require("express").Router();

usersRouter.get("/", (req, res) => {
  res.send("Router working!!");
});

module.exports = usersRouter;
