"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const app_interceptor_1 = require("../../../app.interceptor");
const decorators_1 = require("../../../common/decorators");
const utility_1 = require("../../../utils/utility");
const winston_1 = require("winston");
const order_service_1 = require("../services/order.service");
let OrderController = class OrderController {
    constructor(logger, orderService, utilityService) {
        this.logger = logger;
        this.orderService = orderService;
        this.utilityService = utilityService;
    }
    saveOrder(body) {
        return this.orderService.save(body);
    }
    getAllOrders(queryParam) {
        const { skip, limit, page } = this.utilityService.getPagination(queryParam.page, queryParam.pageSize);
        return this.orderService.findByPagnation(skip, limit, page, undefined);
    }
    getOrderByUserId(userId, queryParam) {
        const { skip, limit, page } = this.utilityService.getPagination(queryParam.page, queryParam.pageSize);
        return this.orderService.findByPagnation(skip, limit, page, userId);
    }
    updateOrder(body, orderId) {
        return this.orderService.updateByOrderId(body, orderId);
    }
    async deleteOrder(orderId) {
        const data = await this.orderService.deleteByOrderId(orderId);
        return data;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "saveOrder", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    (0, common_1.Get)("/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderByUserId", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Put)("/:orderId"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("orderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Delete)("/:orderId"),
    __param(0, (0, common_1.Param)("orderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
OrderController = __decorate([
    (0, common_1.UseInterceptors)(app_interceptor_1.AppInterceptor),
    (0, common_1.Controller)(),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Inject)("winston")),
    __metadata("design:paramtypes", [winston_1.Logger,
        order_service_1.OrderService,
        utility_1.Utility])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map