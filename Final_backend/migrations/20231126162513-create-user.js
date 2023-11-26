"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(25),
      },
      userName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      pwdHash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      defaultAddress: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "addresses",
          key: "addressId",
        },
      },
      userStatus: {
        type: Sequelize.CHAR,
        allowNull: false,
        defaultValue: "Y",
      },
      userRole: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: "roles",
          key: "roleId",
        },
      },
      profile_img: {
        type: Sequelize.TEXT,
      },
      joinedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
