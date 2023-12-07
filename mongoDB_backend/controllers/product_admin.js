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
        next(error);
      }
    }
  });
});

productAdminRouter.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    next(error);
  }
});

productAdminRouter.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully", product });
  } catch (error) {
    next(error);
  }
});

module.exports = productAdminRouter;
