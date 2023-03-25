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
exports.ServicesRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ServicesRepository = class ServicesRepository {
    constructor(servicesModel) {
        this.servicesModel = servicesModel;
    }
    async saveService(body) {
        const orderInterface = new this.servicesModel(body);
        return orderInterface.save();
    }
    async findByPagination(skip, limit) {
        const result = await this.servicesModel
            .find({
            isDeleted: false,
        }, null, { limit: limit, skip: skip })
            .sort({ createdAt: -1 })
            .exec();
        console.log("result", result);
        const servicesArray = [];
        result.map((data) => {
            servicesArray.push({
                name: data.name,
                description: data.description,
                fee: data.fee,
                serviceId: JSON.parse(JSON.stringify(data._id)),
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            });
        });
        return servicesArray;
    }
    async updateService(body, orderId) {
        const data = await this.servicesModel.findOneAndUpdate({ _id: orderId }, {
            name: body.name,
            description: body.description,
            fee: body.fee,
        }, { new: true });
        return data;
    }
    async deleteService(serviceId) {
        const data = await this.servicesModel.findOneAndUpdate({ _id: serviceId }, {
            isDeleted: true,
        }, { new: true });
        return data;
    }
};
ServicesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Services")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ServicesRepository);
exports.ServicesRepository = ServicesRepository;
//# sourceMappingURL=services.repository.js.map