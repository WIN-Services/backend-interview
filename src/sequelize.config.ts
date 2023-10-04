import {Dialect} from "sequelize";

export const sequelizeConfig = {
    dialect: 'postgres' as Dialect,
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    autoLoadModels: true,
    synchronize: true,
}