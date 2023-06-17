import { injectable } from "inversify";
import "reflect-metadata";
import { BaseImplementationType, BaseTypeInjectable } from "../services/base.type.injectable";

interface IBaseValidator {
    [key: string]: any;
}
@injectable()
export class BaseValidator extends BaseTypeInjectable implements IBaseValidator {
    [key: string]: any;
    constructor() {
        super(BaseImplementationType.Validator);
    }
}
