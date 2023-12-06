const { tokenExtractor, userExtractor } = require("../utils/middleware");
const productAdminRouter = require("express").Router();
const Product = require("../models/product");
const Color = require("../models/color");
const cloudinary = require("../script");

productAdminRouter.post("/", async (req, res, next) => {
  const sentFile = req.files.img;
  cloudinary.uploader.upload(sentFile.tempFilePath, async (err, result) => {
    if (err) {
      next(err);
    } else {
      try {
        const img = result.url;
        const {
          name,
          company,
          price,
          discountedPrice,
          description,
          category,
          featured,
          stock,
          rating,
          star,
          colors,
        } = req.body;

        const product = new Product({
          name,
          company,
          price,
          discountedPrice,
          description,
          category,
          featured,
          stock,
          rating,
          star,
          colors,
          img,
        });

        const savedProduct = await product.save();

        res.status(201).json(savedProduct);
      } catch (error) {
        console.log("heeror here");
        next(error);
      }
    }
  });
});

module.exports = productAdminRouter;
