"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Rating.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  Rating.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rating",
      indexes: [
        {
          unique: true,
          fields: ["user_id", "product_id"],
        },
      ],
    }
  );
  return Rating;
};
