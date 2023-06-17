import { injectable } from "inversify";
import "reflect-metadata";
import { BaseTypeMeta, ICustomTransactionModel } from "../services/base.type.injectable";

interface IBaseController {
    [key: string]: any;
}

@injectable()
export class BaseController extends BaseTypeMeta implements IBaseController {
    [key: string]: any;
    public transactionOption: ICustomTransactionModel = null as any;

    constructor() { super("controller"); }
}
