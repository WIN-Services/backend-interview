import * as express from 'express';

export const propertyOf = <TObj>(name: keyof TObj) => name;

export interface IAuditLogger {
  logRequest(request: express.Request, hideFields: string[] | undefined, userIsRequired: boolean): Promise<void>;

  logResponse(request: express.Request, response: express.Response): Promise<void>;
}
