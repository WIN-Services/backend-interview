export const knex = require("knex")({
    client: "postgres",
    connection: {
      database: "postgres",
      user: "postgres",
      password: "mysecretpassword",
    },
    pool: {
      min: 2,
      max: 10,
    },
  });
  
