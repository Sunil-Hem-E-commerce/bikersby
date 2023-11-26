const user = sequelize.define(
  "user",
  {
    user_id: {
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
    user_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pwd_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    default_address: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "address",
        key: "address_id",
      },
    },
    user_status: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    joined_on: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
    },
    user_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "role",
        key: "role_id",
      },
    },
    profile_img: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "JoinedAt",
  }
);

module.exports = user;
