import * as express from 'express';

export interface IAuthenticationService {
  authenticateRequest(request: express.Request, response: express.Response): Promise<void>;
}
