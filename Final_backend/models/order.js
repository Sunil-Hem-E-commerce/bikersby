const order = (sequelize, DataTypes) =>
  sequelize.define(
    "order",
    {
      orderId: {
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
      order_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "order_status_opts",
          key: "optionId",
        },
      },
      sub_total: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "orders",
      timestamps: true,
      createdAt: "order_placed",
      updatedAt: false,
    }
  );

module.exports = order;
