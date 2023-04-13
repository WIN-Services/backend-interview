import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

export const HttpError = (
  statusCode: number,
  message: string,
): HttpException => {
  return new HttpException(
    {
      status: statusCode,
      error: message,
    },
    statusCode,
  );
};

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const getErrorMessage = (exception: unknown): string | object => {
  return exception instanceof HttpException
    ? exception.getResponse()
    : {
        status: HttpStatus.PROCESSING,
        message: 'something went wrong while converting error message.',
      };
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const code = getStatusCode(exception);
    const errorResponse = getErrorMessage(exception);
    if (!errorResponse['error']) {
      errorResponse['error'] = 'Internal server error';
    }
    response.status(code).json({
      error: true,
      code: code,
      message: errorResponse['error'],
      data: null,
    });
  }
}
