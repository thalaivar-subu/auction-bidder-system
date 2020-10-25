const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8010;
const APP_NAME = process.env.APP_NAME;
const LOGPATH = process.env.LOGPATH || `/docker-logs/${APP_NAME}`;
const FILE_NAME = `${LOGPATH}/${APP_NAME}.log`;
const TIME_TO_RESPOND = 200;
const AUCTION_SYSTEM_URL = "http://127.0.0.1:8081";
const HOST = process.env.HOST || "0.0.0.0";
const MYSQL_DB = process.env.MYSQL_DB || "auction_bidder_system";
const MYSQL_UNAME = process.env.MYSQL_UNAME || "root";
const MYSQL_PWD = process.env.MYSQL_PWD || "123456";
const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
export {
  HOST,
  NODE_ENV,
  PORT,
  APP_NAME,
  LOGPATH,
  FILE_NAME,
  TIME_TO_RESPOND,
  AUCTION_SYSTEM_URL,
  MYSQL_DB,
  MYSQL_UNAME,
  MYSQL_PWD,
  MYSQL_HOST,
};
