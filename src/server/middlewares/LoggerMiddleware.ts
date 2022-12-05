import * as morgan from 'morgan';
import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../common/logging/Logger.interface';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { expressCb } from './ExpressCb';

@injectable()
export class LoggerMiddleware {
  constructor(@inject(INVERSIFY_TYPES.Logger) private logger: ILogger) {
    morgan.token('remote-user', (req: express.Request) => {
      this.logger.debug('unknown', req.body);
      return 'unknownUser';
    });
  }

  /**
   * Uses morgan to log the API request and response.
   * @returns {expressCb}
   */
  public handler(): expressCb {
    const loggerStream = {
      write: (message: string) => {
        this.logger.info(message);
      },
    };
    return morgan('combined', { stream: loggerStream });
  }
}
