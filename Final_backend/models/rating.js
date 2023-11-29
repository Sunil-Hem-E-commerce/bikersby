const rating = (sequelize, DataTypes) =>
  sequelize.define(
    "rating",
    {
      ratingId: {
        type: DataTypes.INTEGE,
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
    },
    {
      tableName: "ratings",
      timestamps: true,
      createdAt: false,
      updatedAt: true,
      uniqueKeys: {
        unique_rating: {
          fields: ["user_id", "product_id"],
        },
      },
    }
  );

module.exports = rating;
