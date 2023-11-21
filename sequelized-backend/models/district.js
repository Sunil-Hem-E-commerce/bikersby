const District = (sequelize, DataTypes) =>
  sequelize.define("District", {
    districtId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    districtName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  });

module.exports = District;
