import express = require("express");
import { IDBConnection } from "./shared/services/base.type.injectable";
import { DBConfiguration } from "./database";
import Routes from "./routes";
import CONFIG from "./config"

const app = express();

export const init = async () => {
    const dbConnection: IDBConnection | null | undefined = await DBConfiguration
        .initiateDatabase(CONFIG.databaseConnectionString, {
            StopQueryLogging: CONFIG.STOP_SEQUELIZE_QUERY_LOGGING
        });
    if (!dbConnection) {
        console.log(`Database connection is not initialized`);
    }

    Routes.init(app, express.Router());

    return app;
}
