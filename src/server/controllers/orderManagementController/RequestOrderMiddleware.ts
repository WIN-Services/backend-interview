import { inject, injectable } from 'inversify';
import * as Joi from 'joi';
import { INVERSIFY_TYPES } from '../../../Inversify/InversifyTypes';
import { ILogger } from '../../../common/logging/Logger.interface';
import ValidationMiddleware from '../../middlewares/ValidationMiddleware';
import { ILocalizeService } from '../../../instances/others/LocalizeService.interface';

export const RequestOrderSchema = Joi.object().keys({
  description: Joi.string().min(1).max(255).required(),
  services: Joi.array().min(1).max(10).required(),
  totalFee: Joi.number().min(1).max(99999).required(),
  userId: Joi.string().min(1).max(255).required()
});

export interface IRequestOrderParams {
  description?: string;
  services: string[];
  totalFee: number;
  userId: string;
}

@injectable()
export class RequestOrderMiddleware extends ValidationMiddleware<IRequestOrderParams> {
  constructor(
    @inject(INVERSIFY_TYPES.Logger) logger: ILogger,
    @inject(INVERSIFY_TYPES.LocalizeService) localize: ILocalizeService
  ) {
    super(logger, localize, RequestOrderSchema);
  }
}
