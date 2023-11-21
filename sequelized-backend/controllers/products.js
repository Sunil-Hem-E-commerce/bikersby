const productsRouter = require("express").Router();

productsRouter.get("/", (req, res) => {
  // send all products
  res.send("Router working!!");
});

productsRouter.get("/single/:id", (req, res) => {
  // send single product
  res.send("Router working!!");
});

module.exports = productsRouter;
