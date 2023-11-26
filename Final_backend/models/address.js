const address = (sequelize, DataTypes) =>
  sequelize.define(
    "address",
    {
      addressId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      addressLine1: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      addressLine2: {
        type: DataTypes.STRING(255),
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      districtId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "District",
          key: "district_id",
        },
      },
    },
    {
      tableName: "addresses",
      timestamps: false,
    }
  );

module.exports = address;
