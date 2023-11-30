const orderItem = (sequelize, DataTypes) =>
  sequelize.define(
    "orderItem",
    {
      orderItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "orderId",
        },
      },
      qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inventoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "inventories",
          key: "inventoryId",
        },
      },
    },
    {
      tableName: "order_items",
      timestamps: false,
    }
  );

module.exports = orderItem;
