import { injectable } from "inversify";
import "reflect-metadata";
import { BaseImplementationType, BaseTypeMeta, ICustomTransactionModel } from "./base.type.injectable";

export interface IService {
    transactionOption: ICustomTransactionModel | null;
}

@injectable()
export class BaseService extends BaseTypeMeta implements IService {
    constructor() {
        super(BaseImplementationType.Service);
    }
}
