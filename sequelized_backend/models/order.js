"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Order.belongsTo(models.Order_status_opt, {
        foreignKey: "status_id",
        as: "order_status",
      });
      Order.hasMany(models.Order_item, {
        foreignKey: "order_id",
        as: "order_details",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      status_id: DataTypes.INTEGER,
      order_total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
