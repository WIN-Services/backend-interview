require('dotenv').config();

const config = {
  debug: process.env.DB_DEBUG,
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  migrations: {
    directory: `${__dirname}/schema/migrations`,
    tableName: 'knex_migrations'
  },
  pool: {
    min: 5,
    max: 40
  }
};
module.exports = config;