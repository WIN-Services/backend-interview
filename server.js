console.log("Start")
const express = require('express');
const app = new express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;

const orderRoutes = require('./Routes/orderRoute');

// Initialize the models and db connection
require('./models/mongoose');

// Middleware
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// app.use(express.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));

// For display API URL call with params and body for testing
app.use((req, res, next) => {
    console.log(`API URL : ${req.url}`);
    next();
});

// initialize routes
app.use('/api', [orderRoutes]);
// require('./versions/v1')(app);

app.listen(port, ()=> {
console.log(`server is running on ${port}`);
})

module.exports = app;