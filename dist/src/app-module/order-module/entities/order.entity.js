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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.OrderEntity = exports.Services = void 0;
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("@nestjs/mongoose");
const typeorm_1 = require("typeorm");
class Services {
}
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Services.prototype, "id", void 0);
exports.Services = Services;
let OrderEntity = class OrderEntity {
    beforeInsertActions() {
        this.isDeleted = false;
    }
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "services", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "totalFee", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "userId", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], OrderEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderEntity.prototype, "beforeInsertActions", null);
OrderEntity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], OrderEntity);
exports.OrderEntity = OrderEntity;
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(OrderEntity);
//# sourceMappingURL=order.entity.js.map