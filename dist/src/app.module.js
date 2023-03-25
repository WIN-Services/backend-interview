"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nest_winston_1 = require("nest-winston");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const logger_1 = require("./libs/logger/logger");
const base_module_1 = require("./app-module/base/base.module");
const order_module_1 = require("./app-module/order-module/order.module");
const user_module_1 = require("./app-module/user-module/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const guards_1 = require("./common/guards");
const typeorm_config_1 = require("./database/typeorm.config");
const services_module_1 = require("./app-module/services-module/services.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(typeorm_config_1.mongoConfig),
            nest_winston_1.WinstonModule.forRoot(logger_1.winstonOptions),
            core_1.RouterModule.register([
                {
                    path: "/user",
                    module: user_module_1.UserModule,
                },
                {
                    path: "/order",
                    module: order_module_1.OrderModule,
                },
                {
                    path: "/services",
                    module: services_module_1.ServicesModule,
                },
            ]),
            user_module_1.UserModule,
            order_module_1.OrderModule,
            services_module_1.ServicesModule,
            base_module_1.BaseModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: guards_1.AccessTokenGuard,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map