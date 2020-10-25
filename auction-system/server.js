// eslint-disable-next-line no-unused-vars
import logEventErrors from "../utils/event-errors";
import logger from "../utils/logger";
import { parseJson } from "../utils/common";
import { middleware, set } from "express-http-context";
import express from "express";
import uniqid from "uniqid";
import morgan from "morgan";
import { PORT, HOST } from "../utils/constants.js";

const app = express();

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
app.use(express.urlencoded({ limit: "256kb", extended: true }));
app.use(express.json({ limit: "256kb" }));
app.use(middleware);
app.use((req, res, next) => {
  const { headers: { context } = {}, body } = req;
  const { uniqId = uniqid() } = parseJson(context);
  set("reqId", uniqId);
  set("requestBody", body);
  next();
});

app.get("/", (req, res) => {
  res.send("ok");
});

const startServer = () => {
  // app.listen(HOST, PORT);
  app.listen(PORT);
  logger.info(`Running on http://${HOST}:${PORT}`);
};

startServer();
