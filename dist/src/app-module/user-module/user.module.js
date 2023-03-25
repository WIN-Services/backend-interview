"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const env_1 = require("../../env");
const jwt_1 = require("@nestjs/jwt");
const user_controller_1 = require("./controller/user.controller");
const auth_controller_1 = require("./controller/auth.controller");
const user_repository_1 = require("./repositories/user.repository");
const user_service_1 = require("./services/user.service");
const base_module_1 = require("../base/base.module");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const utility_1 = require("../../utils/utility");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({ secret: env_1.env.jwt.accessKey }),
            mongoose_1.MongooseModule.forFeature([{ name: "User", schema: user_entity_1.UserSchema }]),
            base_module_1.BaseModule,
        ],
        controllers: [user_controller_1.UserController, auth_controller_1.AuthController],
        providers: [user_service_1.UserService, user_repository_1.UserRepository, utility_1.Utility],
        exports: [user_service_1.UserService, user_repository_1.UserRepository],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map