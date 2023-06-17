import { injectable } from "inversify";
import "reflect-metadata";
import { BaseImplementationType, BaseTypeMeta } from "../services/base.type.injectable";

interface IBaseValidator {
    [key: string]: any;
}
@injectable()
export class BaseValidator extends BaseTypeMeta implements IBaseValidator {
    [key: string]: any;
    constructor() {
        super(BaseImplementationType.Validator);
    }
}
