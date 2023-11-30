"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_type.init(
    {
      product_id: DataTypes.INTEGER,
      color_id: DataTypes.INTEGER,
      is_featured: DataTypes.BOOLEAN,
      img1: DataTypes.STRING,
      img2: DataTypes.STRING,
      img3: DataTypes.STRING,
      img4: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product_type",
    }
  );
  return Product_type;
};
