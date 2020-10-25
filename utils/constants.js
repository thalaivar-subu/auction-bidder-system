const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 8010;
const APP_NAME = process.env.APP_NAME;
const LOGPATH = process.env.LOGPATH || `/docker-logs/${APP_NAME}`;
const FILE_NAME = `${LOGPATH}/${APP_NAME}.log`;

export { NODE_ENV, PORT, APP_NAME, LOGPATH, FILE_NAME };
