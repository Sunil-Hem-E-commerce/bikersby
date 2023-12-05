const Cart = require("../models").Cart;

module.exports = {
  async list(req, res) {
    const cartList = await Cart.findAll({});
    res.status(200).send(cartList);
  },
};
