"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Addresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      address_line: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      municipal: {
        type: Sequelize.STRING,
      },
      district_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Districts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Addresses");
  },
};
