import * as express from 'express';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../common/logging/Logger.interface';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { expressCb } from './ExpressCb';

@injectable()
export class LocalizeMiddleware {
  constructor(@inject(INVERSIFY_TYPES.Logger) private logger: ILogger) {}

  /**
   * @returns {expressCb}
   */
  public handler(): expressCb {
    return (request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> => {
      this.logger.debug('Localize lanaguage checking');
      let language = String(request.headers['accept-language']);
      const supportedLanguage = ['en'];
      if (!supportedLanguage.includes(language)) {
        language = 'en';
      }
      this.logger.debug(`Localize lanaguage: ${language}`);

      process.env.locale = language;
      const device = String(request.headers.device);
      if (device) {
        process.env.device = device;
      }
      this.logger.debug(`device : ${device}`);

      const { ip } = request;
      if (ip) {
        process.env.ip = ip;
      }
      this.logger.debug(`ip : ${ip}`);

      next();
      return Promise.resolve();
    };
  }
}
