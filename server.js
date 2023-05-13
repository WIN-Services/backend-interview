require('dotenv').config();

const express = require("express")
const bodyParser = require('body-parser')
const app = express()

const {ERROR_LOGGER, INFO_LOGGER, WARN_LOGGER} = require("./utils/logger")
const {dbUtil} = require('./db')
const routes = require('./routes/order')
const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

dbUtil.connect()

const router = express.Router();

app.use('/api', routes(router));

app.listen(port, async (err) => {
    if (!err) {
        INFO_LOGGER(`Listening on ${port}`)
    } else{
        ERROR_LOGGER(err.stack)
    }
})

// exported for testing purpose
module.exports = app
