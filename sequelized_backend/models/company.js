"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Product, {
        foreignKey: "company_id",
        as: "products",
      });
    }
  }
  Company.init(
    {
      company_name: DataTypes.STRING,
      company_logo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Company",
    }
  );
  return Company;
};
