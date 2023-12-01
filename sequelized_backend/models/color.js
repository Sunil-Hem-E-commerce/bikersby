"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      Color.hasMany(models.Product_type, {
        foreignKey: "color_id",
        as: "products",
      });
    }
  }
  Color.init(
    {
      product_color: DataTypes.STRING,
      color_hex: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Color",
      timestamps: false,
    }
  );
  return Color;
};
