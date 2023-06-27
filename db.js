const { Pool } = require("pg");

// Create a new pool instance with your PostgreSQL connection details
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: 'assignmentdb',
  password: "hareesh",
  port: 5432, // Default PostgreSQL port is 5432
});

pool.connect()

pool.query('SELECT * FROM services', (error, results) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(results.rows);
});



module.exports = pool;
