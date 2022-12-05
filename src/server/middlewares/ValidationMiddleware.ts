import * as express from 'express';
import { inject, injectable, unmanaged } from 'inversify';
import * as Joi from 'joi';
import { ILocalizeService } from '../../instances/others/LocalizeService.interface';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { ILogger } from '../../common/logging/Logger.interface';
import { expressCb } from './ExpressCb';

@injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default abstract class ValidationMiddleware<TBodyType> {
  constructor(
    private logger: ILogger,
    @inject(INVERSIFY_TYPES.LocalizeService)
    private localize: ILocalizeService,
    @unmanaged() private validationSchema: Joi.ObjectSchema
  ) {}

  /**
   * Middleware to validate the request body conforms to a specification TBodyType.
   * This implementation uses joi to validate the incoming request body.
   * @returns {expressCb}
   */
  public handler(): expressCb {
    return (request: express.Request, response: express.Response, next: express.NextFunction): void => {
      // Validating incoming request params
      const validation = this.validationSchema.validate(request.body);

      // Validation errors
      if (validation.error) {
        this.logger.error(this.localize.getLocalizationMessage('RequestBodyValidationFailed'));
        response.status(400).json(validation.error.details);
        return;
      }

      this.logger.info('Request body validation successful');
      next();
    };
  }

  /**
   * Middleware to validate the request body conforms to a specification TBodyType.
   * This implementation uses joi to validate the incoming request body.
   * @returns {expressCb}
   */
  public handlerQueryParams(): expressCb {
    return (request: express.Request, response: express.Response, next: express.NextFunction): void => {
      // Validating incoming request params

      const validation = this.validationSchema.validate(request.query);

      // Validation errors
      if (validation.error) {
        this.logger.error(this.localize.getLocalizationMessage('RequestBodyValidationFailed'));
        response.status(400).json(validation.error.details);
        return;
      }

      this.logger.info('Request body validation successful');
      next();
    };
  }
}
