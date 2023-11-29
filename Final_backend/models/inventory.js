const inventory = (sequelize, DataTypes) =>
  sequelize.define(
    "inventory",
    {
      inventoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userId",
        },
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product_items",
          key: "itemId",
        },
      },
      isShipping: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      discounted_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "inventories",
      uniqueKeys: {
        unique_inventory: {
          fields: ["userId", "itemId"],
        },
      },
    }
  );

module.exports = inventory;
