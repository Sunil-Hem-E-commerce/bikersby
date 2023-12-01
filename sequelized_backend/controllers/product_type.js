const Product_type = require("../models").Product_type;
const Product = require("../models").Product;
const Color = require("../models").Color;

module.exports = {
  async list(req, res) {
    const list = await Product_type.findAll({
      include: [
        {
          model: Product,
          as: "main_product",
        },
        {
          model: Color,
          as: "color",
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).send(list);
  },
};
