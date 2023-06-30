"use strict";

const _ = require("lodash");
const convict = require("convict");

const conf = convict({
  // Server Configuration
  env: {
    doc: "node env",
    format: String,
    default: "",
    env: "NODE_ENV",
    arg: "node_env",
  },
  mongo: {
    environment: {
      doc: "mongo environment",
      format: String,
     default: "mongodb://localhost:27017/",
      env: "",
      arg: "",
    }
  },
  app_env: {
    doc: "env",
    format: String,
    default: "",
    env: "ENV",
    arg: "env",
  },
  mode: {
    doc: "app mode",
    format: String,
    default: "server",
    env: "MODE",
    arg: "mode",
  },
  serverType: {
    doc: "server type",
    format: String,
    default: "scheduler",
    env: "SERVER_TYPE",
    arg: "server_type",
  },
  port: {
    doc: "The port to bind",
    format: "port",
    default: "80",
    env: "PORT",
    arg: "port",
  },
  enableCORS: {
    doc: "cors toggle",
    format: Boolean,
    default: "true",
    env: "ENABLE_CORS",
    arg: "enarble_cors",
  },
  routes: {
    panel: {
      doc: "panel router",
      format: String,
      default: "",
      env: "ROUTE_PANEL",
      arg: "route_panel",
    },
  },
});

// Perform validation
conf.validate({
  allowed: "strict",
});

module.exports = conf;
