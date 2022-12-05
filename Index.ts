import { ServerInit } from './src/ServerInit';
import config from './src/config/Config';

// reload paths
process.env.NODE_PATH = __dirname;
process.env.PORT = config.app.backend.PORT;
process.env.NODE_ENV = config.server;
// tslint:disable
require('./src/instances/cron/Cron');
require('module').Module._initPaths();
// tslint:enable

// Log node warnings
process.on('warning', e => console.warn(e.stack));

// Server less handler
let serverInit: ServerInit | undefined;

if (!serverInit) {
  serverInit = new ServerInit();
}

serverInit.appServer.listen();
