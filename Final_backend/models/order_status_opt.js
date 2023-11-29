const orderStatusOpts = (sequelize, DataTypes) =>
  sequelize.define(
    "OrderStatusOpt",
    {
      optionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      order_status_value: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "Order_status_opts",
      timestamps: false,
    }
  );

module.exports = orderStatusOpts;
