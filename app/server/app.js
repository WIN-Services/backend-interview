"use strict";

const http = require("http");
http.globalAgent.keepAlive = true;
const cors = require("cors");
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");

const conf = require("./../../config");
const cookieParser = require("cookie-parser");
function createApp(server_type) {
  const app = express();
  app.use(bodyParser.json({ limit: "2mb" }));
  app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
  if (conf.get("env") === "development") {
    const allowedHeaders = [
      "content-type",
      "Content-Range",
      "Range",
      "x-currency-code",
      "authorization",
    ];

    const exposedHeaders = [
      "Accept-Ranges",
      "Content-Encoding",
      "Content-Length",
      "Content-Range",
      "Range",
    ];

    let corsAllowedDomain = function (req, callback) {
      let corsOptions = {
        origin: true,
        credentials: true,
        maxAge: 86400,
        allowedHeaders,
        exposedHeaders,
      };
      callback(null, corsOptions);
    };

    if (conf.get("enableCORS")) {
      const setCORS = cors(corsAllowedDomain);
      app.use(function (req, res, next) {
        if (req.header(constants.SKIP_CORS_HEADER) !== "true") {
          setCORS(req, res, next);
        } else {
          next();
        }
      });
    }
  }

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.disable("x-powered-by");

  console.log("Running server of type ", server_type);
  if (server_type === "scheduler") {
    require("./routes/panel")(app);
  } else {
    console.error("Invalid server type ", server_type);
    process.exit(1);
  }

  app.all("*", function (req, res) {
    res.status(404).json({
      message: "not found",
    });
  });

  app.use(function onError(err, req, res, next) {
    err = err || {};
    let statusCode = 500;
    if (
      err.name === "ValidationError" ||
      err.name === "ResourceNotFoundError"
    ) {
      statusCode = 400;
    }
    if (err.name === "CastError") {
      statusCode = 400;
    }
    if (err.statusCode) {
      statusCode = err.statusCode;
    }

    let resData = {
      message: err.errors || err.message || err,
      code: err.code,
      sentry: res.sentry,
    };

    res.status(statusCode).json(resData);
  });
  return app;
}

module.exports = createApp;
