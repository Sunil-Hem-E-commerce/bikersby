"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Migration for 'colors' table
    await queryInterface.createTable("colors", {
      colorId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      color: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      hex: {
        type: Sequelize.STRING(6),
        allowNull: false,
        unique: true,
      },
    });

    // Migration for 'companies' table
    await queryInterface.createTable("companies", {
      companyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      company: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      logo: {
        type: Sequelize.TEXT,
      },
    });

    // Migration for 'categories' table
    await queryInterface.createTable("categories", {
      catId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop 'categories' table
    await queryInterface.dropTable("categories");

    // Drop 'companies' table
    await queryInterface.dropTable("companies");

    // Drop 'colors' table
    await queryInterface.dropTable("colors");
  },
};
