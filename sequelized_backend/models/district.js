"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {
      District.hasMany(models.Address, {
        foreignKey: "district_id",
        as: "addresses",
      });
    }
  }
  District.init(
    {
      district_name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "District",
      timestamps: false,
    }
  );
  return District;
};
