
import { config as dotenvConfig } from "dotenv";
interface IProcessConfig {
    databaseConnectionString: string;
    STOP_SEQUELIZE_QUERY_LOGGING: boolean;
    HTTP_PORT: number
}
dotenvConfig();

const processConfig: IProcessConfig = {
    databaseConnectionString: process.env.databaseConnectionString || "",
    STOP_SEQUELIZE_QUERY_LOGGING: ((process.env.STOP_SEQUELIZE_QUERY_LOGGING || 'true') === 'false' ? false : true),
    HTTP_PORT: process.env.HTTP_PORT ? +process.env.HTTP_PORT : 3000
} as IProcessConfig;

export default processConfig;
