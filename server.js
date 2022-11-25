const express = require('express');
const bodyParser = require('body-parser');
require('./services/dbConnection');
const { handleError, ErrorHandler } = require('./services/error');
const ordersRoute = require('./routes/orderRoute');

const app = express();
app.use(bodyParser.json());

app.use('/order', ordersRoute);

// handles all the 404 errors
app.use((req, res, next) => {
    next(new ErrorHandler(404, 'Not found'));
});

app.use((err, req, res, next) => {
    handleError(err, res);
});

app.listen(3000, () => console.log('App listening on port 3000!'));