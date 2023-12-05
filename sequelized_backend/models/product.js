"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Product_type, {
        foreignKey: "product_id",
        as: "types",
      });
      Product.hasMany(models.Rating, {
        foreignKey: "product_id",
        as: "ratings",
      });
      Product.belongsTo(models.Company, {
        foreignKey: "company_id",
        as: "company",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Product.init(
    {
      product_name: {
        type: DataTypes.STRING,
        unique: true,
      },
      product_des: DataTypes.STRING,
      overall_rating: DataTypes.INTEGER,
      mileage: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      company_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: false,
    }
  );
  return Product;
};
