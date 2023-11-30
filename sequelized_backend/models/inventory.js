"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
