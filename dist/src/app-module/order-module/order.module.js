"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const env_1 = require("../../env");
const jwt_1 = require("@nestjs/jwt");
const order_controller_1 = require("./controller /order.controller");
const order_service_1 = require("./services/order.service");
const mongoose_1 = require("@nestjs/mongoose");
const order_entity_1 = require("./entities/order.entity");
const order_repository_1 = require("./repository/order.repository");
const utility_1 = require("../../utils/utility");
const user_module_1 = require("../user-module/user.module");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({ secret: env_1.env.jwt.accessKey }),
            mongoose_1.MongooseModule.forFeature([{ name: "Order", schema: order_entity_1.OrderSchema }]),
            user_module_1.UserModule,
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, order_repository_1.OrderRepository, utility_1.Utility],
        exports: [order_service_1.OrderService, order_repository_1.OrderRepository, utility_1.Utility],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map