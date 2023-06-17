import { injectable } from "inversify";
import "reflect-metadata";
import { BaseTypeInjectable, ICustomTransactionModel } from "../services/base.type.injectable";

interface IBaseController {
    [key: string]: any;
}

@injectable()
export class BaseController extends BaseTypeInjectable implements IBaseController {
    [key: string]: any;
    public transactionOption: ICustomTransactionModel = null as any;

    constructor() { super("controller"); }
}
