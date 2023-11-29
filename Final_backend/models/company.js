const company = (sequelize, DataTypes) =>
  sequelize.define(
    "company",
    {
      company_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      logo: {
        type: DataTypes.TEXT,
      },
    },
    {
      tableName: "companies",
      timestamps: false,
    }
  );

module.exports = company;
