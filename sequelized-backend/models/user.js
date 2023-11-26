module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "User",
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
          model: "Addresses",
          key: "addressId",
        },
      },
      userStatus: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: "Y",
      },
      profileImg: {
        type: DataTypes.STRING(255),
      },
    },
    {
      timestamps: true,
      createdAt: "JoinedAt",
    }
  );
