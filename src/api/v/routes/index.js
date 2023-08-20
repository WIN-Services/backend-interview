const app = (module.exports = require('express')());

app.use('/order', require('./orderRoutes'));