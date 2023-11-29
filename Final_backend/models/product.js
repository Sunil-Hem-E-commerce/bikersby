const product = (sequelize, DataTypes) =>
  sequelize.define(
    "product",
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      productName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      productDes: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      overallRating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "products",
      timestamps: false,
    }
  );

module.exports = product;
