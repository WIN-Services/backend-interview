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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repositories/user.repository");
const jwt_1 = require("@nestjs/jwt");
const _ = require("lodash");
let UserService = class UserService {
    constructor(logger, userRepository, jwtService) {
        this.logger = logger;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async create(body) {
        try {
        }
        catch (error) {
            console.log("error", error);
            if (error.code === 11000)
                throw new common_1.BadRequestException("User already Exists");
            else {
                throw new common_1.BadRequestException("Internal Server Error");
            }
        }
    }
    async findByPagnation(skip, limit, page) {
        try {
            const data = await this.userRepository.findByPagination(skip, limit + 1);
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
    async deleteByUserId(userId) {
        try {
            return this.userRepository.deleteUser(userId);
        }
        catch (error) {
            console.log("Error", error);
            throw new common_1.BadRequestException("Internal Server Error");
        }
    }
    async updateByUserId(body, userId) {
        try {
            return this.userRepository.updateUser(body, userId);
        }
        catch (error) {
            console.log("Error", error);
            throw new common_1.BadRequestException("Internal Server Error");
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("winston")),
    __metadata("design:paramtypes", [common_1.Logger,
        user_repository_1.UserRepository,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map