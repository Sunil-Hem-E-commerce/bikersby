const Product_type = require("../models").Product_type;
const Product = require("../models").Product;
const Color = require("../models").Color;
const Category = require("../models").Category;
const Company = require("../models").Company;

module.exports = {
  async list(req, res) {
    const list = await Product.findAll({
      attributes: { exclude: ["category_id", "company_id"] },
      include: [
        {
          model: Category,
          as: "category",
          attributes: { exclude: ["id"] },
        },
        {
          model: Company,
          as: "company",
          attributes: { exclude: ["id"] },
        },
        {
          model: Product_type,
          as: "types",
          attributes: { exclude: ["id", "product_id", "color_id"] },
          include: [
            {
              model: Color,
              as: "color",
              attributes: { exclude: ["id"] },
            },
          ],
        },
      ],
    });
    res.status(200).send(list);
  },
};
