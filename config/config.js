/**
 * Third party libraries
 */
const mongoose = require('mongoose')

/** current mongoose database object, contains creds & connection info */
const DB = {
    URL: process.env.CS_DB_URL,
    PORT: process.env.CS_DB_PORT,
    USERNAME: process.env.CS_DB_USERNAME,
    PASSWORD: process.env.CS_DB_PASSWORD,
    NAME: process.env.CS_DB_NAME
};

/** mongodb connection configuration */
const mongoOptions = {
    maxPoolSize: 10,
    socketTimeoutMS: 60000 // 60sec 
};

/**
 * Connects to the given MongoDB instance.
 * @param {String} db_uri mongodb connection uri
 * @param {Object} options mongodb connection configuration
 * @returns connection object
 */
const dbConnection = (db_uri, options = {}) => {
    const connection = mongoose.createConnection(db_uri, options, (err) => {
        if (err) console.log('Unable to connect to the server, Please try again.\n', err)
    })
    connection.on('connected', () => { console.log('Database connection fine!') });
    connection.on('error', (err) => { console.log(`Mongoose default connection error: ${err}`) });
    connection.on('disconnected', () => { console.log('Mongoose default connection disconnected') });

    DB.MONGOOSE_CONN = mongoose
    return connection
}

let mongoUri = ''
if (DB.URL === 'localhost' || DB.URL === '127.0.0.1') {
    mongoUri = `mongodb://${DB.URL}:${DB.PORT}/${DB.NAME}`
} else {
    mongoUri = `mongodb://${DB.USERNAME}:${DB.PASSWORD}@${DB.URL}:${DB.PORT}/${DB.NAME}`
}

DB.MONGOOSE_CONN_OBJECT = dbConnection(mongoUri, mongoOptions)

module.exports = { DB }