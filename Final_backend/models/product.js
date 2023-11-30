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
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "company",
          key: "companyId",
        },
      },
      catId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "catId",
        },
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
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: "products",
      timestamps: false,
    }
  );

module.exports = product;
