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
      district_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "District",
      timestamps: false,
    }
  );
  return District;
};
