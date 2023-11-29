const user = (sequelize, DataTypes) =>
  sequelize.define(
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
        unique: true,
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
        allowNull: true,
        references: {
          model: "address",
          key: "address_id",
        },
      },
      userStatus: {
        type: DataTypes.CHAR,
        allowNull: false,
        defaultValue: "Y",
      },
      userRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
      updatedAt: false,
    }
  );

module.exports = user;
