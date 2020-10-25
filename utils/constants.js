const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8010;
const APP_NAME = process.env.APP_NAME;
const LOGPATH = process.env.LOGPATH || `/docker-logs/${APP_NAME}`;
const FILE_NAME = `${LOGPATH}/${APP_NAME}.log`;
const TIME_TO_RESPOND = 200;
const AUCTION_SYSTEM_URL = "http://127.0.0.1:8081";

export {
  NODE_ENV,
  PORT,
  APP_NAME,
  LOGPATH,
  FILE_NAME,
  TIME_TO_RESPOND,
  AUCTION_SYSTEM_URL,
};
