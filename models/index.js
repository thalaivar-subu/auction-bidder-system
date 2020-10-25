import { Sequelize } from "sequelize";
import logger from "../utils/logger";
import { basename, join } from "path";
import { readdirSync } from "fs";
import { seq } from "async";

const sequelize = new Sequelize("auction_bidder_system", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  logging: (v) => logger.info(v),
});
(async () => {
  try {
    await sequelize.authenticate();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
})();

const baseName = basename(__filename);
const db = {};

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== baseName && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(
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

module.exports = db;
