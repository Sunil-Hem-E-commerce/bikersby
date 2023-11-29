"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Migration for Order_status_opts
    await queryInterface.createTable(
      "order_status_opts",
      {
        option_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        order_status_value: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      {
        timestamps: false,
      }
    );

    // Migration for Orders
    await queryInterface.createTable("orders", {
      orderId: {
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
      order_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sub_total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_placed: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Migration for OrderItem
    await queryInterface.createTable("order_item", {
      orderItemId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "orderId",
        },
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      inventoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "inventories",
          key: "inventoryId",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop tables in reverse order
    await queryInterface.dropTable("order_item");
    await queryInterface.dropTable("orders");
    await queryInterface.dropTable("Order_status_opts");
  },
};
