const { tokenExtractor, userExtractor } = require("../utils/middleware");
const productAdminRouter = require("express").Router();
const Product = require("../models/product");
const Color = require("../models/color");

productAdminRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    console.log("here", req.body);
    try {
      const user = req.user;
      const { name, company, price, description, image, colors } = req.body;
      console.log("here", image);
      const product = new Product({
        name,
        company,
        price,
        description,
        image,
        colors,
      });

      const savedProduct = await product.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productAdminRouter;
