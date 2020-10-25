import { APP_NAME, LOGPATH, NODE_ENV, FILE_NAME } from "./constants.js";
import { transports, format, createLogger } from "winston";
import { existsSync, mkdirSync } from "fs";
import { get } from "express-http-context";
import safeStringify from "fast-safe-stringify";

const { printf, combine, timestamp, label } = format;

// Our Custom Format of Logging
const logCustomFormat = printf(
  ({ level, message, label, timestamp, stack, ...info }) => {
    const logContent = { timestamp, label, message };
    const reqId = get("reqId");
    const requestBody = get("requestBody");
    if (reqId) logContent.reqId = reqId;
    if (info) logContent.info = info;
    if (level === "error") {
      if (requestBody) logContent.requestBody = requestBody;
      if (stack) logContent.stack = stack;
    }
    return safeStringify(logContent);
  }
);

// Creating Log Directory
const createLoggerDirectory = () => {
  try {
    if (!existsSync(LOGPATH)) mkdirSync(LOGPATH);
  } catch (error) {
    console.log("Error while creating Log Directory -> ", error);
  }
};
createLoggerDirectory();

// Using Logger For both Sitemap generation and Productms
// Creating Logger
const logger = createLogger({
  format: combine(label({ label: APP_NAME }), timestamp(), logCustomFormat),
  transports: [new transports.File({ filename: FILE_NAME })],
});

// Enable logging in console on Development
if (NODE_ENV === "development") {
  logger.add(
    new transports.Console({
      format: combine(label({ label: APP_NAME }), timestamp(), logCustomFormat),
    })
  );
}

export default logger;
