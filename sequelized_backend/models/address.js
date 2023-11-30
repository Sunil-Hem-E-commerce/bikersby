"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      Address.belongsTo(models.District, {
        foreignKey: "district_id",
        as: "district",
      });
      Address.hasMany(models.User, {
        foreignKey: "address_id",
        as: "users",
      });
    }
  }
  Address.init(
    {
      address_line: DataTypes.STRING,
      city: DataTypes.STRING,
      municipal: DataTypes.STRING,
      district_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Address",
      timestamps: false,
    }
  );
  return Address;
};
