import { Sequelize } from "sequelize";
import logger from "../utils/logger";
import { basename, join } from "path";
import { readdirSync } from "fs";
import { seq } from "async";
import {
  MYSQL_DB,
  MYSQL_UNAME,
  MYSQL_PWD,
  MYSQL_HOST,
} from "../utils/constants";

const sequelize = new Sequelize(MYSQL_DB, MYSQL_UNAME, MYSQL_PWD, {
  host: MYSQL_HOST,
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
