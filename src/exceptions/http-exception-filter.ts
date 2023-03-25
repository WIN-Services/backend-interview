import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    if (request.url.match("refresh")) status = 403;
    response.status(status).json({
      code: status,
      message: this.getErrorMessage(exceptionResponse["message"]),
      data: null,
    });
  }
  private getErrorMessage(message: [] | string) {
    if (typeof message === "string") return message;
    else if (Array.isArray(message)) {
      const messageArray = Object.assign([], message);
      return messageArray[messageArray.length - 1];
    } else return message;
  }
}
