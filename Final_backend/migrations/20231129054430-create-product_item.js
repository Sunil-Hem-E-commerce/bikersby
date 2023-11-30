"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "product_items",
      {
        itemId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "products",
            key: "productId",
          },
        },
        colorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "colors",
            key: "colorId",
          },
        },
        isfeatured: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        prod_img1: {
          type: Sequelize.TEXT,
        },
        prod_img2: {
          type: Sequelize.TEXT,
        },
        prod_img3: {
          type: Sequelize.TEXT,
        },
        prod_img4: {
          type: Sequelize.TEXT,
        },
      },
      {
        tableName: "product_items",
        timestamps: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_items");
  },
};
