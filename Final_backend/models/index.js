"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;

if (config.url) {
  sequelize = new Sequelize(config.url, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

sequelize
  .authenticate()
  .then(() => {
    console.log(
      `Postgres connection has been established successfully to database: ${sequelize.config.database} by user: ${sequelize.config.username}`
    );
  })
  .catch((error) => {
    console.error("Unable to connect to the database::", error);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// importing models
db.district = require("./district")(sequelize, Sequelize.DataTypes);
db.address = require("./address")(sequelize, Sequelize.DataTypes);
db.role = require("./role")(sequelize, Sequelize.DataTypes);
db.user = require("./user")(sequelize, Sequelize.DataTypes);
db.product = require("./product")(sequelize, Sequelize.DataTypes);
db.category = require("./category")(sequelize, Sequelize.DataTypes);
db.company = require("./company")(sequelize, Sequelize.DataTypes);
db.color = require("./color")(sequelize, Sequelize.DataTypes);
db.product_item = require("./product_item")(sequelize, Sequelize.DataTypes);
db.inventory = require("./inventory")(sequelize, Sequelize.DataTypes);
db.rating = require("./rating")(sequelize, Sequelize.DataTypes);
db.order_status_opt = require("./order_status_opt")(
  sequelize,
  Sequelize.DataTypes
);
db.order_item = require("./order_item")(sequelize, Sequelize.DataTypes);
db.order = require("./order")(sequelize, Sequelize.DataTypes);

// Associations
// db.district.hasMany(db.address);
// db.address.belongsTo(db.district);

module.exports = db;
