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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const app_interceptor_1 = require("../../../app.interceptor");
const decorators_1 = require("../../../common/decorators");
const winston_1 = require("winston");
const create_dto_1 = require("../dto/create.dto");
const user_service_1 = require("../services/user.service");
let AuthController = class AuthController {
    constructor(logger, userService) {
        this.logger = logger;
        this.userService = userService;
    }
    signup(body) {
        return this.userService.create(body);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/signup"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
AuthController = __decorate([
    (0, common_1.UseInterceptors)(app_interceptor_1.AppInterceptor),
    (0, common_1.Controller)("/auth"),
    __param(0, (0, common_1.Inject)("winston")),
    __metadata("design:paramtypes", [winston_1.Logger,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map