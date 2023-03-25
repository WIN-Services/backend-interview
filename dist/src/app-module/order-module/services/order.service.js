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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("../entities/order.entity");
const order_repository_1 = require("../repository/order.repository");
const _ = require("lodash");
let OrderService = class OrderService {
    constructor(logger, orderRepository) {
        this.logger = logger;
        this.orderRepository = orderRepository;
    }
    async save(body) {
        const isOrderExist = await this.orderRepository.findByUserId(body.userId);
        console.log("isOrderExist", isOrderExist);
        if (isOrderExist && isOrderExist !== null)
            throw new common_1.BadRequestException("Order already exists");
        try {
            const orderEntity = Object.assign(body, new order_entity_1.OrderEntity());
            const data = await this.orderRepository.saveOrder(orderEntity);
            return Object.assign({}, this.orderResponse(data));
        }
        catch (error) {
            console.log(" Error", error);
            if (error.code === 11000)
                throw new common_1.BadRequestException("Exists");
            else {
                throw new common_1.BadRequestException("Internal Server Error");
            }
        }
    }
    async findByPagnation(skip, limit, page, userId) {
        try {
            const data = await this.orderRepository.findByPagination(skip, limit + 1, userId ? { userId: userId } : {});
            const nextPage = data.length < limit + 1 ? null : Number(page) + 1;
            const docs = data.length < limit + 1 ? data : data.slice(0, limit + 1);
            return {
                docs: docs,
                nextPage: nextPage,
            };
        }
        catch (error) {
            console.log("Error", error);
            return {
                docs: [],
                nextPage: null,
            };
        }
    }
    async deleteByOrderId(orderId) {
        try {
            return this.orderRepository.deleteOrder(orderId);
        }
        catch (error) {
            console.log("Error", error);
            throw new common_1.BadRequestException("Internal Server Error");
        }
    }
    async updateByOrderId(body, orderId) {
        try {
            return this.orderRepository.updateOrder(body, orderId);
        }
        catch (error) {
            console.log("Error", error);
            throw new common_1.BadRequestException("Internal Server Error");
        }
    }
    orderResponse(orderModel) {
        return {
            services: orderModel.services,
            orderId: orderModel._id,
            createdAt: orderModel.createdAt,
            updatedAt: orderModel.updatedAt,
            userId: orderModel.userId,
        };
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("winston")),
    __metadata("design:paramtypes", [common_1.Logger,
        order_repository_1.OrderRepository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map