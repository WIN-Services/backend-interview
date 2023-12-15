import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: 3306,
    password: process.env.MYSQL_PASSWORD,
    user: 'root', //Get from env
    database: 'demo',//Get from env
    connectionLimit: 5,
    supportBigNumbers: true
})

const [res] = await pool.query('SELECT 1')
if (res) {
    console.log("Mysql DB Connected");
}

export default pool