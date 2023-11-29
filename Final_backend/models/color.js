const color = (sequelize, DataTypes) =>
  sequelize.define(
    "color",
    {
      colorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      hex: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "colors",
      timestamps: false,
    }
  );

module.exports = color;
