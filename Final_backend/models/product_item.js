const product_items = (sequelize, DataTypes) =>
  sequelize.define(
    "product_items",
    {
      itemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "productId",
        },
      },
      colorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "color",
          key: "colorId",
        },
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
      isfeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      prod_img1: {
        type: DataTypes.TEXT,
      },
      prod_img2: {
        type: DataTypes.TEXT,
      },
      prod_img3: {
        type: DataTypes.TEXT,
      },
      prod_img4: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "product_items",
      timestamps: false,
    }
  );

module.exports = product_items;
