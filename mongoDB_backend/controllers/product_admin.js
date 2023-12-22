const { tokenExtractor, userExtractor } = require("../utils/middleware");
const Product = require("../models/product");
const Color = require("../models/color");
const Image = require("../models/image");
const cloudinary = require("../script");

module.exports = {
  async addProduct(req, res, next) {
    try {
      const {
        name,
        company,
        price,
        discountedPrice,
        description,
        category,
        featured,
        stock,
        reviews,
        stars,
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
        reviews,
        stars,
      });

      const savedProduct = await product.save();

      const color = new Color({ hex: req.body.hex, product: savedProduct._id });
      await color.save();

      savedProduct.colors = savedProduct.colors.concat(color._id);
      await savedProduct.save();

      //sending image to cloudinary
      const sentFile = req.files.image;
      cloudinary.uploader.upload(sentFile.tempFilePath, async (err, result) => {
        if (err) {
          next(err);
        } else {
          try {
            const img = result.url;
            const image = new Image({ url: img, product: savedProduct.id });
            await image.save();
            savedProduct.images = savedProduct.images.concat(image._id);
            await savedProduct.save();
            res.status(201).send("Product created with image sucessufully");
          } catch (error) {
            next(error);
          }
        }
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "Product updated successfully", product });
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);

      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }

      res
        .status(200)
        .json({ message: "Product deleted successfully", product });
    } catch (error) {
      next(error);
    }
  },
};
