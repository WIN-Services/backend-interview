import pkg from 'pg';
const { Pool } = pkg;

// Create a pool with the connection details
const pool = new Pool({
    user: 'postgres',         // PostgreSQL username
    host: 'localhost',        // Use the container name or IP address if connecting from another container
    database: 'ordermanagement',   // The name of your database
    password: 'Fahad@123',     // PostgreSQL password
    port: 5432,               // PostgreSQL port
});

export default pool