// Update with your config settings.

module.exports = {
  development: {
    client: 'postgres',
    connection: {
      database: 'postgres',
      user: 'postgres',
      password: 'mysecretpassword'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
