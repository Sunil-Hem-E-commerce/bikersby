"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      Inventory.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Inventory.hasMany(models.Order_item, {
        foreignKey: "inventory_id",
        as: "orders",
      });
      Inventory.belongsTo(models.Product_type, {
        foreignKey: "type_id",
        as: "product_type",
      });
    }
  }
  Inventory.init(
    {
      user_id: DataTypes.INTEGER,
      type_id: DataTypes.INTEGER,
      is_shipping: DataTypes.BOOLEAN,
      qty: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      discounted_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Inventory",
    }
  );
  return Inventory;
};
