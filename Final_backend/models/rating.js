const Rating = (sequelize, DataTypes) =>
  sequelize.define(
    "rating",
    {
      ratingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "userId",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "product_id",
        },
      },
      indv_rating: {
        type: DataTypes.INTEGER,
      },
      indv_comment: {
        type: DataTypes.TEXT,
      },
      created_on: {
        type: DataTypes.TIMESTAMP,
        allowNull: false,
      },
    },
    {
      tableName: "ratings",
      timestamps: false,
      timestamps: true,
      createdAt: false,
      updatedAt: "reviwedAt",
      uniqueKeys: {
        unique_rating: {
          fields: ["user_id", "product_id"],
        },
      },
    }
  );

module.exports = rating;
