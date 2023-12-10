const Product = require("../models/product");

module.exports = {
  async list(req, res, next) {
    try {
      const products = await Product.find({})
        .populate("images")
        .populate("colors");
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async listOne(req, res, next) {
    try {
      const product = await Product.findById(req.params.id)
        .populate("colors", {})
        .populate("images", {});
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
};
