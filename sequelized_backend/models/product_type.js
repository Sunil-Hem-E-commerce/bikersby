"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_type extends Model {
    static associate(models) {
      Product_type.hasMany(models.Inventory, {
        foreignKey: "type_id",
        as: "inventories",
      });
      Product_type.belongsTo(models.Color, {
        foreignKey: "color_id",
        as: "color",
      });
      Product_type.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "main_product",
      });
    }
  }
  Product_type.init(
    {
      product_id: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      is_featured: DataTypes.BOOLEAN,
      img1: DataTypes.STRING,
      img2: DataTypes.STRING,
      img3: DataTypes.STRING,
      img4: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product_type",
    }
  );
  return Product_type;
};
