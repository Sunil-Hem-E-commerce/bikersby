const address = sequelize.define(
  "address",
  {
    address_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    address_line1: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address_line2: {
      type: DataTypes.STRING(255),
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    district_id: {
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
