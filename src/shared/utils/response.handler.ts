import { Response } from "express-serve-static-core";
import { CustomError } from "./custom.error";
import { ValidationError } from "./validation.error";

export class ResponseHandler {
    public static standardError = "Some technical error occurred. Please contact administrator.";

    public static sendStatus(data: any, res: Response) {
        return res.sendStatus(data.http.statusCode);
    }

    public static sendResponse(err: any, data: any, res: any, msg?: any) {
        return ResponseHandler.sendResponseAfterLogResponse(err, data, res, msg);
    }

    private static sendResponseAfterLogResponse(err: any, data: any, res: any, msg?: any) {
        if (err) {
            return ResponseHandler.sendErrorResponse(err, res);
        } else if (msg) {
            return ResponseHandler.sendSuccessMessageResponse(data, res, msg);
        }
        return ResponseHandler.sendSuccessResponse(data, res);
    }

    private static sendErrorResponse(err: any, res: any) {
        let errMsg = ResponseHandler.standardError;
        let errCode = (err && err.errorCode) || 400;

        const env = process.env.NODE_ENV;
        const isCustomErrorInstance: boolean = err instanceof CustomError;
        const isValidationErrorInstance: boolean = err instanceof ValidationError;

        let errObj = null;
        try {
            errObj = err && err.message && JSON.parse(err.message) || { message: errMsg };
            errObj.errorCode = err.errorCode;
        } catch (e) {
            // console.log(e);
        }

        if (errObj instanceof Object) {
            errMsg = errObj.message;
            errCode = errObj.errorCode;
        } else {
            errCode = err.errorCode || 400;
            if (env === "production" && !res["bypass-env-variable"]) {
                errMsg = isCustomErrorInstance ? err.message : ResponseHandler.standardError;
            } else {
                errMsg = err.message || ResponseHandler.standardError;
            }
        }

        if (isValidationErrorInstance) {
            return res.status(errCode).json({
                message: errMsg,
                validationFailures: err.payload || err.validationFailures,
            });
        }

        const result: any = { message: errMsg };
        errCode = errCode || 400;
        return res.status(errCode).json(result);
    }

    private static sendSuccessMessageResponse(data: any, res: Response, msg: string) {
        return res.status(200).json({ message: msg, data });
    }

    private static sendSuccessResponse(data: any, res: Response) {
        return res.status(200).json({ data });
    }
}
