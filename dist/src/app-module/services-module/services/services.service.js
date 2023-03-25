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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const services_entity_1 = require("../entities/services.entity");
const services_repository_1 = require("../repository/services.repository");
const _ = require("lodash");
let ServicesService = class ServicesService {
    constructor(logger, servicesRepository) {
        this.logger = logger;
        this.servicesRepository = servicesRepository;
    }
    async save(body) {
        try {
            const OrderServiceEntity = Object.assign(body, new services_entity_1.ServicesEntity());
            const data = await this.servicesRepository.saveService(OrderServiceEntity);
            return Object.assign({}, this.servicesResponse(data));
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
    async findByPagnation(skip, limit, page) {
        try {
            const data = await this.servicesRepository.findByPagination(skip, limit + 1);
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
    async deleteByServiceId(serviceId) {
        try {
            return this.servicesRepository.deleteService(serviceId);
        }
        catch (error) {
            console.log("Error", error);
            throw new common_1.BadRequestException("Internal Server Error");
        }
    }
    async updateByServiceId(body, serviceId) {
        try {
            return this.servicesRepository.updateService(body, serviceId);
        }
        catch (error) {
            console.log("Error", error);
            throw new common_1.BadRequestException("Internal Server Error");
        }
    }
    servicesResponse(serviceModel) {
        return {
            serviceId: serviceModel._id,
            createdAt: serviceModel.createdAt,
            updatedAt: serviceModel.updatedAt,
            name: serviceModel.name,
            description: serviceModel.description,
            fee: serviceModel.fee,
        };
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("winston")),
    __metadata("design:paramtypes", [common_1.Logger,
        services_repository_1.ServicesRepository])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map