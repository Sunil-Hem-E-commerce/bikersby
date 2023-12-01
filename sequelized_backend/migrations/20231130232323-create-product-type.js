"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product_types", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      product_id: {
        type: Sequelize.INTEGER,
      },
      color_id: {
        type: Sequelize.INTEGER,
      },
      is_featured: {
        type: Sequelize.BOOLEAN,
      },
      img1: {
        type: Sequelize.STRING,
      },
      img2: {
        type: Sequelize.STRING,
      },
      img3: {
        type: Sequelize.STRING,
      },
      img4: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Product_types");
  },
};
