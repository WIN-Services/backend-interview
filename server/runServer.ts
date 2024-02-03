import server from "./server";
import routes from "./routes";
import config from "./config";

const port = config.RUNNING_PORT;
new server().router(routes).listen(port);
