const conf = require("./config");

const mode = conf.get("mode");
let handler

(async function () {
  

  // startHealthCheckDaemon()
    //for running app in different modes like server part , consumer part in kubernetes 
  if (mode === "server") {
    await require('./db/index')
    const serverType = conf.get("serverType");
    const server = require("./app/server/index");
    console.log("serverType", serverType);
    const validServerType = ["scheduler", "administrator"];
    if (!validServerType.includes(serverType)) {
      throw "Invalid Server Type";
    }
    const PORT = conf.get("port");
    const app = server.listen(PORT, serverType);
  } else {
    throw "Invalid mode";
  }

  process.on("SIGTERM",async function () {   
        process.exit(0);
  });

  process.on("SIGINT", async function () {
    process.exit(0);
  });
})();
