const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
  database: {
    url: process.env.DATABASE_URL,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
