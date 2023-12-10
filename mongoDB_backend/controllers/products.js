const Product = require("../models/product");

module.exports = {
  async list(req, res, next) {
    try {
      const products = await Product.find({})
        .populate({
          path: "images",
          options: { limit: 1 },
          select: "url",
        })
        .populate({ path: "colors", select: "hex" });

      const flattenedProducts = products.map((product) => {
        const {
          _id,
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
          images,
          colors,
        } = product;
        return {
          id: _id,
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
          image: images[0]?.url,
          colors: colors.map((color) => color.hex),
        };
      });
      res.json(flattenedProducts);
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
