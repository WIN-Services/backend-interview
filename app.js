/**
 * Third party libraries
 */
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

/**
 * Internal helper functions/libraries
 */
const { sendResponse } = require('./controllers/handlers/responseHandler')
const { tryCatchHandler } = require('./controllers/handlers/tryCatchHandler')

//TODO Import all routes here...
const { testInsertion } = require('./test/dbConnection')
const { addUser } = require('./controllers/routes/users')
const { getAllOrders, placeNewOrder, deleteExistingOrder, updateExistingOrder } = require('./controllers/routes/orders')

// defining the Express app
const app = express()

app.options('*', cors())
// enabling CORS for all requests
const corsParams = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsParams)) //add origin verification & pre-flight requests/response handling

// adding Helmet to enhance your Rest API's security
app.use(helmet())

// using bodyParser to parse JSON bodies into JS objects
app.use(express.json())

// adding morgan to log HTTP requests
app.use(morgan('combined'))

// defining welcome endpoint
app.get('/', (req, res) => {
    sendResponse(res, 200, {}, 'This is demo for win-services backend assignment')
})


/** Registering routes */
app.get('/test', tryCatchHandler(testInsertion))

app.post('/createTestUsers', tryCatchHandler(addUser))

app.get('/getOrders', tryCatchHandler(getAllOrders))

app.post('/placeOrder', tryCatchHandler(placeNewOrder))

app.delete('/deleteOrder', tryCatchHandler(deleteExistingOrder))

app.patch('/updateOrder', tryCatchHandler(updateExistingOrder))



// /** Catch 404 and forward to error handler */
// app.use((req, res, next) => {
//     const status = 404
//     const message = 'Not Found'

//     const err = new Error(message)
//     err.message = message
//     err.status = status
//     err.scope = err.scope || 'Route not found.'

//     next(err)
// })

// app.use((err, req, res, next) => {
//     const status = err.status || 800
//     const message = err.message || 'Something went wrong'
//     const scope = err.scope || 'expressErrorHandler'
//     let { method, url, originalUrl } = req
//     url = (url == '/') ? originalUrl : url

//     sendResponse(res, status, { scope: err.scope }, message)

//     const metadata = { method, url }
//     // TODO send data to error handling function
//     // function ({ err, scope: scope, metadata, status: status })
//     next()
// })

module.exports = {
    app
}