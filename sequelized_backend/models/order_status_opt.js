"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_status_opt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_status_opt.init(
    {
      status_opt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order_status_opt",
      timestamps: false,
    }
  );
  return Order_status_opt;
};
