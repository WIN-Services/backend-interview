// Modules imports
const express = require('express');
const connectDB = require('./config/databaseCon');
const app = express();

// Importing Routes
const order_route=require('./routes/order')
const service_route=require('./routes/service')



//Connecting mongodb
connectDB();

//Midllewares
app.use(express.json());



//Routes middlewares
app.use('/api/order',order_route);
app.use('/api/service',service_route );

//Starting server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The app is listening on port ${port}`));

module.exports = app;