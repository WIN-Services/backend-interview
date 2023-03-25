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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const app_interceptor_1 = require("../../../app.interceptor");
const decorators_1 = require("../../../common/decorators");
const utility_1 = require("../../../utils/utility");
const winston_1 = require("winston");
const services_service_1 = require("../services/services.service");
let ServicesController = class ServicesController {
    constructor(logger, services, utilityService) {
        this.logger = logger;
        this.services = services;
        this.utilityService = utilityService;
    }
    saveServices(body) {
        return this.services.save(body);
    }
    getAllServices(queryParam) {
        const { skip, limit, page } = this.utilityService.getPagination(queryParam.page, queryParam.pageSize);
        return this.services.findByPagnation(skip, limit, page);
    }
    updateOrderService(body, serviceId) {
        return this.services.updateByServiceId(body, serviceId);
    }
    async deleteOrderService(serviceId) {
        const data = await this.services.deleteByServiceId(serviceId);
        return data;
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "saveServices", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "getAllServices", null);
__decorate([
    (0, common_1.Put)("/:serviceId"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("serviceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "updateOrderService", null);
__decorate([
    (0, common_1.Delete)("/:serviceId"),
    __param(0, (0, common_1.Param)("serviceId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "deleteOrderService", null);
ServicesController = __decorate([
    (0, common_1.UseInterceptors)(app_interceptor_1.AppInterceptor),
    (0, common_1.Controller)(),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Inject)("winston")),
    __metadata("design:paramtypes", [winston_1.Logger,
        services_service_1.ServicesService,
        utility_1.Utility])
], ServicesController);
exports.ServicesController = ServicesController;
//# sourceMappingURL=services.controller.js.map