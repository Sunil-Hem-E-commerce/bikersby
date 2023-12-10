const User = require("../models/user");

module.exports = {
  async addToCart(req, res, next) {
    try {
      const { productId } = req.body;
      const user = await User.findById(req.user._id);
      const product = user.cart.find((item) => item.product == productId);
      if (product) {
        product.quantity += 1;
        await user.save();
        res.status(200).send("Product added to cart");
      } else {
        user.cart.push({ product: productId, quantity: 1 });
        await user.save();
        res.status(200).send("Product added to cart");
      }
    } catch (error) {
      next(error);
    }
  },
};
