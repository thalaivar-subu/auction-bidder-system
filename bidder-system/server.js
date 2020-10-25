// eslint-disable-next-line no-unused-vars
import logEventErrors from "../utils/event-errors";
import logger from "../utils/logger";
import { parseJson } from "../utils/common";
import { middleware, set } from "express-http-context";
import express from "express";
import uniqid from "uniqid";
import morgan from "morgan";
import { PORT, HOST } from "../utils/constants.js";
import restAPIs from "./api/api";
import bodyParser from "body-parser";
import models from "../models";
import { registerBidder } from "./registerbidder";

const app = express();
models.sequelize
  .sync({
    force: false,
    logging: (v) => logger.info(v),
  })
  .then(function () {
    logger.info("DB Connection Successful");
  })
  .catch(function (err) {
    logger.info(err, "Something went wrong when connecting to db");
  });

// Log Request and Response
app.use(
  morgan((tokens, req, res) => {
    logger.info(
      [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens["response-time"](req, res),
        "ms",
      ].join(" ")
    );
  })
);
app.use(bodyParser.urlencoded({ limit: "256kb", extended: true }));
app.use(bodyParser.json({ limit: "256kb" }));
app.use(middleware);
app.use((req, res, next) => {
  const { headers: { context } = {}, body } = req;
  const { uniqId = uniqid() } = parseJson(context);
  set("reqId", uniqId);
  set("requestBody", body);
  next();
});
// Routes for Exposed Rest API's
restAPIs(app);
app.get("/", (req, res) => {
  res.send("ok");
});

registerBidder();

const startServer = () => {
  app.listen(HOST, PORT);
  // app.listen(PORT);
  logger.info(`Running on http://${HOST}:${PORT}`);
};

startServer();
