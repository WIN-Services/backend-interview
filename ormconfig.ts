import { DataSource } from "typeorm";

const myDataSource = new DataSource({
    type: "mysql", 
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "root",
    database: "WIN_ORDER",
    synchronize: false,
    logging: true,
    entities: ["src/database/entities/*ts"],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: [],
});

export default myDataSource;