import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ERROR_MESSAGES } from './error-messages';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    let message = exception.message;

    const exceptionName = exception.name;
    if (exceptionName == 'BadRequestException')
      return response.send(exception.getResponse());

    message =
      ERROR_MESSAGES[exceptionName] || message || 'Internal Server Error';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
