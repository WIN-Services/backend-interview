export class HttpException extends Error {
  /**
   * Message in english that explains the error
   *
   * It should be directly addressed to user
   * as in most cases this will be displayed to user.
   */
  message: string;

  /**
   * App Specific error code that uniquely identifies an error
   *
   * e.g. => When Requesting a specific entity with a specific id,
   * If it is not found, there should be a unique id associated with it
   * and using which frontend should redirect user back to the previous advocate
   */
  errorCode: number;

  /**
   * Http status code
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
   */
  statusCode: number;

  /**
   * Any additional data associated with a specific error.
   *
   * e.g. => Login API might want to send
   * number of attempts left on incorrect password
   */
  meta?: any;

  /**
   * Validation errors thrown by AJV
   * send as it is being thrown by the library...
   */
  errors?: any;

  constructor(message: string, errorCode: ApiErrorCode, statusCode: number, meta?: any, errors?: any) {
    super(message);

    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;

    this.meta = meta;
    this.errors = errors;
  }
}

export enum ApiErrorCode {
  ORDER_NOT_FOUND = 101,
  SERVICE_RECORD_NOT_FOUND = 102,

  TOO_MANY_ORDER_REQUEST = 103,

  VALIDATION_ERROR = 9998,
  UNKNOWN = 9999, // Reserved...
}
