import { NextFunction, Request, RequestHandler, Response } from "express-serve-static-core";
import { Container } from "inversify";

import { ResponseHandler } from "../utils/response.handler";
import { BaseController } from "./base.controller";
import { BaseValidator } from "../validators/base.validator";

import { ICustomTransactionModel, IDBConnection } from "../services/base.type.injectable";


type callbackControllerFunction = (
    dependencies: {
        transactionOptions: ICustomTransactionModel,
        dbConnection: IDBConnection
    },
    req: Request,
    res: Response,
    next: NextFunction) => Promise<any>;

interface IDependencies {
    transactionOptions: ICustomTransactionModel,
    dbConnection: IDBConnection
}

export abstract class BaseRoute {
    protected container: Container;

    constructor(container: Container) {
        this.container = container;
    }

    protected controllerMethod(methodName: string, controllerType: any): any {
        const callbackControllerFunc: callbackControllerFunction = (
            dependencies: IDependencies,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            const controller = this.container.get<any>(controllerType) as BaseController;
            controller.attachProperties.apply(controller, [
                dependencies.transactionOptions, dependencies.dbConnection
            ]);
            return controller[methodName](req, res, next)
                .then((data: any) => ({ data }))
                .catch((err: any) => { throw { err }; });
        };
        return this.processCallback(callbackControllerFunc);
    }

    protected validatorMethod(methodName: string, validatorType: any): any {
        const callbackControllerFunc: callbackControllerFunction = (
            dependencies: IDependencies,
            req: Request,
            res: Response,
            next: NextFunction
        ) => {
            const validator = this.container.get<BaseValidator>(validatorType);
            if (validator.attachProperties) {
                validator.attachProperties.apply(validator, [
                    dependencies.transactionOptions, dependencies.dbConnection
                ]);
            }
            return validator[methodName](req, res, next);
        }
        return this.processCallback(callbackControllerFunc, true);
    }

    protected abstract getDbConf(req: Request): IDBConnection;

    private processCallback(callbackControllerFunc: callbackControllerFunction, isValidator = false) {
        try {
            return this.excuteCallback(callbackControllerFunc, isValidator);
        } catch (e) {
            return (req: Request, res: Response) => {
                return ResponseHandler.sendResponse(e, null, res);
            };
        }
    }

    private excuteCallback(bindControllerFunc: callbackControllerFunction, isValidator = false): RequestHandler {
        return (req: Request, res: Response, next: NextFunction): any => {
            try {
                const dbConn = this.getDbConf(req);
                const promise = dbConn.transaction(dbConn.TransactionOption, (tx): any => {
                    const transactionOptions: ICustomTransactionModel = { transaction: tx };
                    return bindControllerFunc({ transactionOptions, dbConnection: dbConn }, req, res, next);
                });

                return this.callbackHandler(promise, (err: Error, data: any) => {
                    if (isValidator && !err) { return next(); }

                    if (data && data["http"] && data.http['statusCode']) {
                        return ResponseHandler.sendStatus(data, res);
                    }
                    return ResponseHandler.sendResponse(err, data, res);
                });
            } catch (error) {
                return ResponseHandler.sendResponse(error, null, res);
            }
        }
    }

    public callbackHandler(promise: Promise<any>, cb: (err: any, data: any) => any): any {
        if (cb == null) {
            return promise;
        }
        return promise.then((data) => {
            cb(null, data && (data.data || data));
        }
        )
            .catch((err: any) => {
                cb(err.err || err, null);
            });
    }
}
