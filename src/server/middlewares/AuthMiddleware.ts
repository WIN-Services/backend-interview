import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../common/logging/Logger.interface';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { IAuditLogger } from '../../instances/aws/AuditLogger.interface';
import { expressPromiseCb } from './ExpressCb';

@injectable()
export class AuthMiddleware {
  constructor(
    @inject(INVERSIFY_TYPES.Logger)
    private logger: ILogger,
    @inject(INVERSIFY_TYPES.AuditLogger)
    private auditLogger: IAuditLogger
  ) {}

  /**
   * Middleware to log the api request and to listen to and log changes made to the response object.
   * The details are logged to the IAudit logger instance.
   *
   * @param {string[]} hideFields
   * @param {boolean} userIsRequired
   * @returns {expressPromiseCb}
   */
  public handler(hideFields?: string[], userIsRequired: boolean | undefined = true): expressPromiseCb {
    return async (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> => {
      const handleRequestClose = async () => {
        const cleanUp = () => {
          response.removeListener('close', handleRequestClose);
          response.removeListener('finish', handleRequestClose);
          response.removeListener('error', handleRequestClose);
        };
        cleanUp();
        try {
          await this.auditLogger.logResponse(request, response);
        } catch (err) {
          this.logger.error(err);
          next(err);
        }
      };

      response.once('close', handleRequestClose);
      response.once('finish', handleRequestClose);
      response.once('error', handleRequestClose);

      try {
        await this.auditLogger.logRequest(request, hideFields, userIsRequired);
        next();
      } catch (err) {
        this.logger.error(err);
        next(err);
      }
    };
  }
}
