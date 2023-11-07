import * as mysql  from "mysql2";
import dbConfig from "../config/db.config";

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// open the MySQL connection

connection.connect((error: any) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
