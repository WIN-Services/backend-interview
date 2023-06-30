"use strict";
require("../init");
const conf = require("../../config");
const createApp = require("./app");
let server;
let restApp;

function listen(port, server_type) {
  restApp = createApp(server_type);
  port = port ? port : conf.get("port");
  server = restApp.listen(port, () => {
    console.log(
      "Server started at http://localhost:" +
        port +
        "for server type: " +
        server_type
    );
  });
  return server;
}

function shutdown(cb) {
  if (server.close) {
    server.close(cb);
  }
}

function appServer() {
  return restApp;
}

module.exports = {
  listen,
  shutdown,
  restApp,
  appServer,
};
