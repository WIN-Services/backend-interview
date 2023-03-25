"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const env_1 = require("../../env");
const jwt_1 = require("@nestjs/jwt");
const services_service_1 = require("./services/services.service");
const mongoose_1 = require("@nestjs/mongoose");
const services_repository_1 = require("./repository/services.repository");
const utility_1 = require("../../utils/utility");
const user_module_1 = require("../user-module/user.module");
const services_entity_1 = require("./entities/services.entity");
const services_controller_1 = require("./controller /services.controller");
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({ secret: env_1.env.jwt.accessKey }),
            mongoose_1.MongooseModule.forFeature([{ name: "Services", schema: services_entity_1.ServicesSchema }]),
            user_module_1.UserModule,
        ],
        controllers: [services_controller_1.ServicesController],
        providers: [services_service_1.ServicesService, services_repository_1.ServicesRepository, utility_1.Utility],
        exports: [services_service_1.ServicesService, services_repository_1.ServicesRepository, utility_1.Utility],
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;
//# sourceMappingURL=services.module.js.map