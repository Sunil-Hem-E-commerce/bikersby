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
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "orders",
      });
      User.hasMany(models.Inventory, {
        foreignKey: "user_id",
        as: "users",
      });
    }
  }
  User.init(
    {
      user_name: DataTypes.STRING,
      user_email: {
        type: DataTypes.STRING,
        unique: true,
      },
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
