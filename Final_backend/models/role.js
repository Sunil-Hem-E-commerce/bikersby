const role = sequelize.define(
  "role",
  {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    roleName: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    timestamps: false,
  }
);

module.exports = role;
