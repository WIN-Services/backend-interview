import AppError from '../utils/appError'
import { Response, Request, NextFunction } from 'express'
import logger from '../config/logger'

const handleCastErrordb = (err: any) => {
  const message = `Invalid ${err.path}:${err.value}`
  return new AppError(message, 400)
}

// production error
const sendErrorProducion = (err: any, res: Response) => {
  // operational error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    })
  } else {
    // log error
    logger.info(`error occured production errr : ${err}`)
    // send generic error
    return res.status(500).json({
      status: 'Error',
      message: 'somthing went wrong',
    })
  }
}

// development

const sendErrorDevelopment = (err: any, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    statck: err.stack,
  })
}
// eslint-disable-next-line
export default (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.info('inside error handler')
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  err.status === true ? (err.status = 'fail') : err.status
  if (process.env.NODE_ENV === 'production') {
    if (err.name === 'CastError') {
      err = handleCastErrordb(err)
    }
    sendErrorProducion(err, res)
  } else {
    sendErrorDevelopment(err, res)
  }
}
