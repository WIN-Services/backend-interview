import { injectable } from "inversify";
import "reflect-metadata";
import { BaseImplementationType, BaseTypeInjectable, ICustomTransactionModel } from "./base.type.injectable";

export interface IService {
    transactionOption: ICustomTransactionModel | null;
}

@injectable()
export class BaseService extends BaseTypeInjectable implements IService {
    constructor() {
        super(BaseImplementationType.Service);
    }
}
