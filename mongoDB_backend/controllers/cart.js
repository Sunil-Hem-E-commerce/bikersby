const User = require("../models/user");

module.exports = {
  async addToCart(req, res, next) {
    try {
      const { qtyToAdd } = req.body;
      const productId = req.params.id;
      const user = await User.findById(req.user);
      const product = user.orders.find((item) => item.product == productId);
      if (product) {
        product.quantity = qtyToAdd;
        await user.save();
        res.status(200).send("Updated the cart quantity");
      } else {
        user.orders.push({
          product: productId,
          quantity: qtyToAdd,
          status: "cart",
        });
        await user.save();
        res.status(200).send("Product added to cart");
      }
    } catch (error) {
      next(error);
    }
  },

  async inxCart(req, res, next) {
    try {
      var productId = req.params.id;
      const user = await User.findById(req.user);
      const product = user.orders.find((item) => item.product == productId);
      if (product) {
        product.quantity += 1;
        await user.save();
        res.status(200).send("Increase the cart quantity");
      } else {
        user.orders.push({ product: productId, quantity: 1, status: "cart" });
        await user.save();
        res.status(200).send("Product added to cart");
      }
    } catch (error) {
      next(error);
    }
  },

  async decCart(req, res, next) {
    try {
      var productId = req.params.id;
      const user = await User.findById(req.user);
      const product = user.orders.find((item) => item.product == productId);
      if (product) {
        product.quantity -= 1;
        await user.save();
        res.status(200).send("Decrease the cart quantity");
      } else {
        res.status(200).send("Add the product to the cart first");
      }
    } catch (error) {
      next(error);
    }
  },

  async updateCart(req, res, next) {
    try {
      var productId = req.params.id;
      const user = await User.findById(req.user);
      user.orders = user.orders.filter((item) => item.product !== productId);
      await user.save();
      res.status(200).send("Product removed from cart");
    } catch (error) {
      next(error);
    }
  },

  async delCart(req, res, next) {
    try {
      const user = await User.findById(req.user);
      user.orders = [];
      await user.save();
      res.status(200).send("Cart has been emptied");
    } catch (error) {
      next(error);
    }
  },
};
