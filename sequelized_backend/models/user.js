"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "user_role",
      });
      User.belongsTo(models.Address, {
        foreignKey: "address_id",
        as: "address",
      });
      User.hasMany(models.Rating, {
        foreignKey: "user_id",
        as: "ratings",
      });
    }
  }
  User.init(
    {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_phone: DataTypes.STRING,
      pwd_hash: DataTypes.STRING,
      address_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
