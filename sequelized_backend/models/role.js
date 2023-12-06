"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, {
        foreignKey: "role_id",
        as: "users",
      });
    }
  }
  Role.init(
    {
      user_role: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
      timestamps: false,
    }
  );
  return Role;
};