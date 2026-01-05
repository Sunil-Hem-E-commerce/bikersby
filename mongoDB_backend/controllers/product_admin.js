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
        hex,
        colors,
        imageUrl,
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

      if (hex) {
        const color = new Color({ hex, product: savedProduct._id });
        await color.save();
        savedProduct.colors = savedProduct.colors.concat(color._id);
      } else if (Array.isArray(colors)) {
        for (const c of colors) {
          const color = new Color({ hex: c, product: savedProduct._id });
          await color.save();
          savedProduct.colors = savedProduct.colors.concat(color._id);
        }
      }

      if (req.files && req.files.image) {
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
      } else if (imageUrl) {
        const image = new Image({ url: imageUrl, product: savedProduct.id });
        await image.save();
        savedProduct.images = savedProduct.images.concat(image._id);
        await savedProduct.save();
        res.status(201).send("Product created successfully");
      } else {
        await savedProduct.save();
        res.status(201).send("Product created successfully");
      }
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
 
  async addBulkProducts(req, res, next) {
    try {
      const { products = [], defaultDiscountPercent } = req.body || {};
      if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "products array is required" });
      }
      const results = [];
      for (const p of products) {
        try {
          const {
            name,
            company,
            price,
            discountedPrice,
            description,
            category,
            featured = false,
            stock = 50,
            reviews = 0,
            stars = 4.5,
            colors = [],
            imageUrl,
          } = p;
 
          const normalizedPrice =
            typeof price === "number" ? price : Math.round(Number(price) * 100);
          const hasDiscount = typeof discountedPrice === "number" || defaultDiscountPercent;
          const computedDiscount =
            typeof discountedPrice === "number"
              ? discountedPrice
              : Math.round(normalizedPrice * (1 - (Number(defaultDiscountPercent) || 0) / 100));
 
          const product = new Product({
            name,
            company,
            price: normalizedPrice,
            discountedPrice: hasDiscount ? computedDiscount : undefined,
            description,
            category,
            featured,
            stock,
            reviews,
            stars,
          });
          const savedProduct = await product.save();
 
          if (Array.isArray(colors)) {
            for (const c of colors) {
              const color = new Color({ hex: c, product: savedProduct._id });
              await color.save();
              savedProduct.colors = savedProduct.colors.concat(color._id);
            }
          }
 
          if (imageUrl) {
            const image = new Image({ url: imageUrl, product: savedProduct.id });
            await image.save();
            savedProduct.images = savedProduct.images.concat(image._id);
          }
          await savedProduct.save();
          results.push({ ok: true, id: savedProduct.id, name: savedProduct.name });
        } catch (e) {
          results.push({ ok: false, error: e.message, name: p?.name });
        }
      }
      res.status(201).json({ message: "Bulk insert processed", results });
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
