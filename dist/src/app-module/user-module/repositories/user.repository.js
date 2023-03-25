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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UserRepository = class UserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async saveUser(body) {
        const userInterface = new this.userModel(body);
        return userInterface.save();
    }
    async updateUser(body, userId) {
        const data = await this.userModel.findOneAndUpdate({ _id: userId }, {
            countryCode: body.email,
            phoneNumber: body.name,
        }, { new: true });
        return data;
    }
    async deleteUser(userId) {
        const data = await this.userModel.findOneAndUpdate({ _id: userId }, {
            isDeleted: true,
        }, { new: true });
        return data;
    }
    async findByEmail(email) {
        const data = await this.userModel
            .findOne({
            email: email,
            isDeleted: false,
        })
            .exec();
        return data;
    }
    async findById(userId) {
        const data = await this.userModel
            .findOne({
            _id: userId,
            isDeleted: false,
        })
            .exec();
        return data;
    }
    async findByPagination(skip, limit) {
        const result = await this.userModel
            .find({
            isDeleted: false,
        }, null, { limit: limit, skip: skip })
            .sort({ createdAt: -1 })
            .exec();
        console.log("result", result);
        const userArray = [];
        result.map((data) => {
            userArray.push({
                email: data.email,
                name: data.name,
                userId: JSON.parse(JSON.stringify(data._id)),
            });
        });
        return userArray;
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map