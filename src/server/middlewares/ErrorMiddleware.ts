import * as express from 'express';
import * as HttpStatus from 'http-status-codes';
import { inject, injectable } from 'inversify';
import { ILocalizeService } from '../../instances/others/LocalizeService.interface';
import { ErrorCode } from '../../common/exceptions/ErrorCode';
import { ILogger } from '../../common/logging/Logger.interface';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { expressErrorCb } from './ExpressCb';
import { Exception } from '../../common/exceptions/Exception';

@injectable()
export class ErrorMiddleware {
  private logger: ILogger;

  private locale: ILocalizeService;

  constructor(
    @inject(INVERSIFY_TYPES.Logger) logger: ILogger,
    @inject(INVERSIFY_TYPES.LocalizeService) locale: ILocalizeService
  ) {
    this.logger = logger;
    this.locale = locale;
  }

  /**
   * Middleware to catch all api errors and exceptions in will convert all errors to the standard response format.
   *
   * @returns {expressErrorCb}
   */
  public handler(): expressErrorCb {
    return (error: Exception, request: express.Request, response: express.Response, next: express.NextFunction) => {
      const status: ErrorCode = error.errorCode || ErrorCode.Undefined;

      this.logger.error(error.message);
      this.logger.error(error.stack ?? '');

      const responseBody = [
        {
          message: error.message || this.locale.getLocalizationMessage('SomthingWentWrong'),
        },
      ];
      if (status === ErrorCode.Undefined && error.stack) {
        this.logger.error(error.stack);
      }
      const httpStatus = ErrorMiddleware.getCode(status);
      response.status(httpStatus).json(responseBody);
      if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
        next(error);
      }
    };
  }

  private static getCode(errorCode: ErrorCode): number {
    switch (errorCode) {
      case ErrorCode.Unauthorised:
        return HttpStatus.UNAUTHORIZED;
      case ErrorCode.Forbidden:
        return HttpStatus.FORBIDDEN;
      case ErrorCode.NotFound:
        return HttpStatus.NOT_FOUND;
      case ErrorCode.BadRequest:
        return HttpStatus.BAD_REQUEST;
      case ErrorCode.Conflict:
        return HttpStatus.CONFLICT;
      case ErrorCode.Undefined:
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
