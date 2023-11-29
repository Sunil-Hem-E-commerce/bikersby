const district = (sequelize, DataTypes) =>
  sequelize.define(
    "district",
    {
      districtId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      districtName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );

module.exports = district;
