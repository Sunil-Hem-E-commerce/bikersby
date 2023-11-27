const category = (sequelize, DataTypes) =>
  sequelize.define(
    "category",
    {
      catId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      tableName: "categories",
      timestamps: false,
    }
  );

module.exports = category;
