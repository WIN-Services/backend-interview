const express = require('express');
const path = require('path');
const config = require('dotenv').config({ path: path.resolve(__dirname, './config.env') });
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { errorLog, successLog } = require('./helpers/loggers');
const initiateRouter = require('./routes/index');


// cors
app.use(cors());

// request payload middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


// error handler middleware
app.use(function (err, req, res, next) {
    errorLog('SERVER ERROR: ', err.stack);
    res.status(500).send({
        status: 500,
        message: err.message,
        body: {},
    });
});

//Inititate Router
initiateRouter(app, express.Router());

//Listen to port
app.listen(port, () => {
    successLog('PORT OPENED : ', `Server listening on port ${port}`);
});

