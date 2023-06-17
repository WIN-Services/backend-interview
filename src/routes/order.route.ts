import { BaseRoute } from "../shared/controllers/base.route.handler";
import { Router, Request } from "express-serve-static-core";
import { IDBConnection } from "../shared/services/base.type.injectable";

import Container from "../infrastructure/container";
import { DBConfiguration } from "../database";
import TYPES from "../infrastructure/type";

export class OrderRoutes extends BaseRoute {
    constructor() {
        super(Container);
    }

    public init(router: Router) {
        router.post(
            "/orders",
            this.validatorMethod("validate", TYPES.OrderValidator),
            this.controllerMethod("create", TYPES.OrderController));
        router.get("/orders/:id", this.controllerMethod("get", TYPES.OrderController));
        router.get("/orders", this.controllerMethod("list", TYPES.OrderController));
        router.patch("/orders/:id", this.controllerMethod("update", TYPES.OrderController));
        router.delete("/orders/:id", this.controllerMethod("delete", TYPES.OrderController));
    }

    protected getDbConf(req: Request): IDBConnection {
        return DBConfiguration.getDbConnection();
    }
}