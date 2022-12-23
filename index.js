/**
 * Third party libraries
 */
require('dotenv').config()

/**
 * Internal helper functions/libraries
 */
const { app } = require('./app')
const CONFIG = require('./config/config')

//disable console.log in production
if (process.env.ENV === "prod") console.log = () => { }

//global error handling
process.on('unhandledRejection', (err, promise) => {
    console.log(err)
})

process.on('uncaughtException', (err, origin) => {
    console.log(err)
})

/**
 * Gracefully disconnects backend from all the connections on 
 * SIGINT & SIGTERM events.
 * @param {String} event Event name 
 */
const cleanup = (event) => {
    console.log(`\nCleanup event called for -> ${event}`)
    console.log("\n Disconnecting DB...")
    CONFIG.DB.MONGOOSE_CONN_OBJECT.close()
    // Exit with default success-code '0'.
    process.exit();
}

// SIGINT is sent for example when you Ctrl+C a running process from the command line.
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// starting the server
app.listen(process.env.PORT, () => { console.log(`win-services demo app started on port ${process.env.PORT}`) })