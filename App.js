const

    express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    routess     = require('./Routes/orderRoutes');

    app.use(bodyParser.json());

    app.use("/", routess);
      

module.exports = app;