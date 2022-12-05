import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../common/logging/Logger.interface';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { IAuditLogger } from './AuditLogger.interface';
import { IAuditLog } from './AuditLog.interface';

@injectable()
export class StandardAuditLogger implements IAuditLogger {
  constructor(
    @inject(INVERSIFY_TYPES.Logger)
    private logger: ILogger
  ) {}

  public async logRequest(
    request: express.Request,
    hideFields: string[] | undefined,
    userIsRequired: boolean
  ): Promise<void> {
    // The user should be authenticated so that their can be recorded with any audit logs
    this.logger.info('user is unauthenticated');
    if (userIsRequired) {
      // throw new ForbiddenException();
    }
  }

  public async logResponse(request: express.Request, response: express.Response): Promise<void> {
    // The user should be authenticated so that their can be recorded with any audit logs

    // Log the request
    const log = {
      category: request.path,
      action: request.method,
      message: 'API Response',
      payload: {
        responseStatus: response.statusCode,
        responseStatusMessage: response.statusMessage,
      },
      user: '',
    };
    await this.log('Audit:Response', log);
  }

  private async log(message: string, log: IAuditLog) {
    await this.logger.info(message, {
      logMessage: JSON.stringify(log),
    });
  }
}
