import { ApiErrorCode, HttpException } from "./http.exception";

export class TooManyRequestException extends HttpException {
  constructor(message: string, errorCode: ApiErrorCode, meta?: any) {
    super(message, errorCode, 429, meta);
  }
}