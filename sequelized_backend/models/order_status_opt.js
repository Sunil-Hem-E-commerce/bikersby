"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_status_opt extends Model {
    static associate(models) {
      Order_status_opt.hasMany(models.Order, {
        foreignKey: "status_id",
        as: "orders",
      });
    }
  }
  Order_status_opt.init(
    {
      status_opt: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Order_status_opt",
      timestamps: false,
    }
  );
  return Order_status_opt;
};
