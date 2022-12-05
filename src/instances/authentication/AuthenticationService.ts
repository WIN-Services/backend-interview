import * as express from 'express';
import { inject, injectable } from 'inversify';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { IAuthenticationService } from './AuthenticationService.interface';
import { ILogger } from '../../common/logging/Logger.interface';

@injectable()
export class AuthenticationService implements IAuthenticationService {
  private logger: ILogger;

  constructor(@inject(INVERSIFY_TYPES.Logger) logger: ILogger) {
    this.logger = logger;
  }

  /**
   * Get the user security principle from the request header
   * @param {e.Request} request The http request
   * @returns {Promise<UserPrinciple | void>} The user principle
   * @throws {NotFoundException} If the user was not found
   */
  public async authenticateRequest(request: express.Request, response: express.Response): Promise<void> {
    const tokens: {
      accessToken: string;
      refreshToken: string;
    } = this.getTokensFromRequest(request);

    // TODO: Validate token here
    this.logger.debug('request log', tokens);
    this.logger.debug('response log', response.getHeaders);
  }

  private getTokensFromRequest(request: express.Request): {
    accessToken: string;
    refreshToken: string;
  } {
    const authToken = (request.headers && request.headers.authorization) || '';
    const aToken = authToken.replace('Bearer ', '');
    let rToken = request.headers.refreshtoken || '';
    if (rToken) {
      rToken = String(request.headers.refreshtoken);
    }

    return {
      accessToken: aToken,
      refreshToken: rToken,
    };
  }
}
