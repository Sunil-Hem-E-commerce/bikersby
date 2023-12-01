"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    static associate(models) {
      Order_item.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "main_order",
      });
    }
  }
  Order_item.init(
    {
      order_id: DataTypes.INTEGER,
      inventory_id: DataTypes.INTEGER,
      subtotal: DataTypes.INTEGER,
      order_qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_item",
    }
  );
  return Order_item;
};
