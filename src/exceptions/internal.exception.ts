import { ApiErrorCode, HttpException } from "./http.exception";

export class InternalException extends HttpException {
  constructor(message: string, errorCode: ApiErrorCode, meta?: any) {
    super(message, errorCode, 500, meta);
  }
}