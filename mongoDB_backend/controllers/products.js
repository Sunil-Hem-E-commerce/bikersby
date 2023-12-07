const productRouter = require("express").Router();
const Product = require("../models/product");
const Color = require("../models/color");

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.find({})
      .populate("images")
      .populate("colors");
    res.json(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("colors", {})
      .populate("images", {});
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productRouter;
