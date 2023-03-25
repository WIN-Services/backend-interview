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
exports.UserSchema = exports.UserEntity = void 0;
const class_transformer_1 = require("class-transformer");
const mongoose_1 = require("@nestjs/mongoose");
const typeorm_1 = require("typeorm");
class BaseEntity {
    beforeInsertActions() {
        this.isDeleted = false;
    }
}
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], BaseEntity.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BaseEntity.prototype, "beforeInsertActions", null);
let UserEntity = class UserEntity extends BaseEntity {
};
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "orders", void 0);
UserEntity = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], UserEntity);
exports.UserEntity = UserEntity;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(UserEntity);
//# sourceMappingURL=user.entity.js.map