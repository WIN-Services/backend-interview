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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const app_interceptor_1 = require("../../../app.interceptor");
const decorators_1 = require("../../../common/decorators");
const utility_1 = require("../../../utils/utility");
const winston_1 = require("winston");
const create_dto_1 = require("../dto/create.dto");
const user_service_1 = require("../services/user.service");
let UserController = class UserController {
    constructor(logger, userService, utilityService) {
        this.logger = logger;
        this.userService = userService;
        this.utilityService = utilityService;
    }
    create(body) {
        return this.userService.create(body);
    }
    getAllUsers(queryParam) {
        const { skip, limit, page } = this.utilityService.getPagination(queryParam.page, queryParam.pageSize);
        return this.userService.findByPagnation(skip, limit, page);
    }
    updateUser(userId, body) {
        return this.userService.updateByUserId(body, userId);
    }
    async deleteUser(userId) {
        const data = await this.userService.deleteByUserId(userId);
        return data;
    }
};
__decorate([
    (0, common_1.Post)("/create"),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Put)("/:userId"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)("userId")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)("/:userId"),
    __param(0, (0, common_1.Param)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, common_1.UseInterceptors)(app_interceptor_1.AppInterceptor),
    (0, common_1.Controller)(),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Inject)("winston")),
    __metadata("design:paramtypes", [winston_1.Logger,
        user_service_1.UserService,
        utility_1.Utility])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map