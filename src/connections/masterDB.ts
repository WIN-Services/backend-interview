import mongoose from 'mongoose'
import logger from '../config/logger'
import config from '../config/config'

const db: mongoose.Connection = mongoose.createConnection(
  `${config.db.uri}`,
  config.db.options
)

db.on('connected', () => {
  logger.info('Mongoose connection open to master DB')
})

// if the connection throws an error
db.on('error', (err) => {
  logger.debug(`mongoose connection error for master DB, ${err}`)
})

// when connection is disconnected
db.on('disconnected', () => {
  logger.debug('Mongoose connection disconnected for master DB')
})

// when connection is reconnected
db.on('reconnected', () => {
  logger.info('mongoose connection reconnected for Master DB')
})

// if node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  db.close(() => {
    logger.debug(
      'mongoose connection disconnected for master DB through app termination'
    )

    //   eslint-disable-next-line no-process-exit
    process.exit(0)
  })
})

export default db
