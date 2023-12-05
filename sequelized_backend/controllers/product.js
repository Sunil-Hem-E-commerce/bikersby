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

    // const flattenedList = list.map((item) => {
    //   const { category, company, types, ...productData } = item.get({
    //     plain: true,
    //   });
    //   const { color, ...typeData } = types;
    //   return {
    //     ...productData,
    //     categoryName: category.name,
    //     companyName: company.name,
    //     typeName: typeData.name,
    //     colorName: color.name,
    //   };
    // });

    // res.status(200).send(flattenedList);
  },

  async listV2(req, res) {
    const list = await Product_type.findAll({});
    res.status(200).send(list);
  },
};
