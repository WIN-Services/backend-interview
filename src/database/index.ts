import {
    Sequelize, Options, Transaction, ModelOptions
} from "sequelize";
import { IDBConnection } from "../shared/services/base.type.injectable";
import { OrderModel } from "../models";

interface IDBOptions {
    Pool?: {
        acquire: number;
        idle: number;
        max: number;
        min: number;
    };
    StopQueryLogging: boolean;
}

export class DBConfiguration {
    static DBConnections: IDBConnection;

    public static async initiateDatabase(connectionString: string, options?: IDBOptions) {
        if (this.DBConnections) {
            console.error("Database is already initialized ...");
            return this.DBConnections;
        }

        const sequelizeOptions: Options = {
            dialect: "postgres",
            pool: Object.assign({
                acquire: 60000,
                idle: 10000,
                max: 20,
                min: 0,
            }, options?.Pool || {})
        };

        sequelizeOptions.logging = !options?.StopQueryLogging ? (msg) => console.log(msg) : false;
        const connectionObj = (new Sequelize(connectionString, sequelizeOptions)) as IDBConnection;

        try {
            await connectionObj.authenticate();
            connectionObj.models = {};
            connectionObj.DefaultModelOptions = this.getPrimaryDbDefaultModelOptions();

            connectionObj.TransactionOption = {
                isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
            };
            // Create Models
            const userModel = new OrderModel(connectionObj);
            // Define Model relationships
            userModel.initRelations();

            this.DBConnections = connectionObj;
            return connectionObj;
        } catch (e) {
            console.error(e);
            return null;
        }

    }

    public static getDbConnection(): IDBConnection {
        if (!this.DBConnections) {
            throw new Error("Database is not intialized");
        }
        return this.DBConnections;
    }

    private static getPrimaryDbDefaultModelOptions(): ModelOptions {
        const obj: ModelOptions = {
            freezeTableName: true,
            timestamps: false
        } as ModelOptions;
        return obj;
    }

}