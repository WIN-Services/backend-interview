import DB from "./DB/initialize.js";
// import { getRedisClient } from "./Caching/cache.js";
import Server from "./server.js";
import Central from "./central.js";

class StartApp {
  async start() {
    const CRUDApp = new Central();
    CRUDApp.DBs = await new DB().getDBConnections(["commonDB"]);
    // CRUDApp.Cache = await getRedisClient()

    // process.on('exit', async () => {
    //   await CRUDApp.Cache.disconnect()
    // })

    new Server(CRUDApp).startServer();
  }
}

new StartApp().start();
