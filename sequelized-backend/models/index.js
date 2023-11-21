const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("bikers", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  //   logging: false,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

(async () => {
  db.district = await require("./district")(sequelize, DataTypes);
  await db.district.sync({ force: true });
  db.address = await require("./address")(sequelize, DataTypes);
  await db.address.sync({ force: true });
  db.user = await require("./user")(sequelize, DataTypes);
  await db.user.sync({ force: true });

  //   await sequelize.sync({ force: true });
})();

module.exports = db;
