module.exports = (sequelize, DataTypes) =>
  sequelize.define("Address", {
    addressId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    addressLine1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING(255),
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Districts",
        key: "districtId",
      },
    },
  });
