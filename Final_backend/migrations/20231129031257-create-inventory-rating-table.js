"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "ratings",
      {
        ratingId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "userId",
          },
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "products",
            key: "productId",
          },
        },
        indv_rating: {
          type: Sequelize.INTEGER,
        },
        indv_comment: {
          type: Sequelize.TEXT,
        },
        created_on: {
          type: Sequelize.TIMESTAMP,
          allowNull: false,
        },
      },
      {
        timestamps: false,
        uniqueKeys: {
          unique_rating: {
            fields: ["userId", "productId"],
          },
        },
      }
    );

    await queryInterface.createTable(
      "inventories",
      {
        inventoryId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "userId",
          },
        },
        itemId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "product_items",
            key: "itemId",
          },
        },
        isShipping: {
          type: Sequelize.CHAR,
          allowNull: false,
          defaultValue: "y",
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        discounted_price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        uniqueKeys: {
          unique_inventory: {
            fields: ["userId", "itemId"],
          },
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ratings");
    await queryInterface.dropTable("inventories");
  },
};