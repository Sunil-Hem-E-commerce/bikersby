const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("bikers", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  // logging: false,
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

db.district = require("./district")(sequelize, DataTypes);
//   await db.district.sync({ force: true });
db.address = require("./address")(sequelize, DataTypes);
//   await db.address.sync({ force: true });
db.user = require("./user")(sequelize, DataTypes);
//   await db.user.sync({ force: true });

db.sequelize.sync({ force: true });

console.log("index ++", db.district);
console.log("index -+", db.address);

module.exports = db;
