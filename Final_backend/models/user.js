const user = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(25),
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pwdHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    defaultAddress: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "address",
        key: "address_id",
      },
    },
    userStatus: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    userRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "role",
        key: "roleId",
      },
    },
    profile_img: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "joinedAt",
  }
);

module.exports = user;
