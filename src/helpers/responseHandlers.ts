import { Response } from 'express'

export interface ResponseHandlerInterface {
  res: Response
  status?: number
  message?: string
  data?: object
  result?: boolean
}

export interface ErrorHandlerInterface {
  res: Response
  statusCode?: number
  err?: Error | string
  data?: object
  result?: boolean
}

export const responseHandler = ({
  res,
  status = 200,
  message = '',
  data = {},
  result = true,
}: ResponseHandlerInterface) => {
  res.status(status).send({ result, status, message, data })
}

export const errorHandler = ({
  res,
  statusCode = 500,
  err = 'error',
  data = {},
  result = false,
}: ErrorHandlerInterface) => {
  res.status(statusCode).send({
    result,
    msg: err instanceof Error ? err.message : err,
    data,
  })
}
