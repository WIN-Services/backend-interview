import mysql from 'mysql'

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.MYSQL_HOST,
    user: 'root',
    password: 'Sanket@2266',
    database: 'commondb',
    debug: false
})




const mySQL = {
    GetData(query: string) {
        return new Promise((resolve, reject) => {
            return pool.query(query, [], (err, data) => {
                if (err) return reject(err);
                resolve(data);
            })
        })
    }
    ,
    InsertOrUpdate(query: string, data: any[]) {
        return new Promise((resolve, reject) => {
            return pool.query(query, data, (err, data) => {
                if (err) return reject(err);
                resolve(data.affectedRows);
            })
        })
    }
}

export default mySQL