"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Product_type, {
        foreignKey: "product_id",
        as: "types",
      });
    }
  }
  Product.init(
    {
      product_name: DataTypes.STRING,
      product_des: DataTypes.STRING,
      overall_rating: DataTypes.INTEGER,
      mileage: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
