import { ApiErrorCode, HttpException } from "./http.exception";

export class UnprocessableEntityException extends HttpException {
  private static MESSAGE = "Validation Error";

  constructor(
    errors: any,
    message: string = UnprocessableEntityException.MESSAGE,
    errorCode: ApiErrorCode = ApiErrorCode.VALIDATION_ERROR,
    meta?: any
  ) {
    super(message, errorCode, 422, meta, errors);
  }
}
