import { inject, injectable } from "inversify";
import { BaseController } from "../shared/controllers/base.controller";
import { Request } from "express-serve-static-core";
import TYPES from "../infrastructure/type";
import { IOrderService } from "../infrastructure/services/order.service";
import { IOrderCreationModel } from "../infrastructure/api.models/order.interface";
import { CustomError } from "../shared/utils/custom.error";


@injectable()
export class OrderController extends BaseController {

    constructor(@inject(TYPES.OrderService) private orderService: IOrderService) {
        super();
    }


    public create(req: Request) {
        const model: IOrderCreationModel = req.body;
        return this.orderService.createOrder(model);
    }

    public get(req: Request) {
        const orderId: number = +req.params["id"];
        if (!orderId) {
            throw new CustomError(new Error("Invalid orderId"), 422);
        }
        return this.orderService.getOrder(orderId);
    }

    public list(req: Request) {
        return this.orderService.listOrder();
    }

    public update(req: Request) {
        const orderId: number = +req.params["id"];
        const dataToUpdate = req.body;
        if (!orderId) {
            throw new CustomError(new Error("Invalid orderId"), 422);
        }
        return this.orderService.updateOrder(orderId, dataToUpdate);
    }

    public delete(req: Request) {
        const orderId: number = +req.params["id"];
        const dataToUpdate = req.body;
        if (!orderId) {
            throw new CustomError(new Error("Invalid orderId"), 422);
        }
        return this.orderService.deleteOrder(orderId);
    }
}