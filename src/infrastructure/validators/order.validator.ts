import { injectable } from "inversify";
import "reflect-metadata";
import { Request } from "express-serve-static-core";
import { BaseValidator } from "../../shared/validators/base.validator";
import { ValidationError } from "../../shared/utils/validation.error";
import { IOrderCreationModel } from "../api.models/order.interface";


@injectable()
export class OrderValidator extends BaseValidator {
    constructor() { super() }

    public async validate(req: Request): Promise<void> {
        const payload: IOrderCreationModel = req.body;
        const errors: string[] = [];

        if ((payload.totalfee !== 0) && !payload.totalfee) {
            errors.push("totalfee missing");
        }

        if(!payload.services || !payload.services.length) {
            errors.push("service missing");
        }

        if (errors.length) {
            throw new ValidationError(errors);
        }
    }


}
