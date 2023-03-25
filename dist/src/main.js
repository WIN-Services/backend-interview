"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_1 = require("./env");
const http_exception_filter_1 = require("./exceptions/http-exception-filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.setGlobalPrefix(env_1.env.app.routePrefix || "/v1");
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.enableCors({
        origin: ["http://localhost:3002", "*"],
        credentials: true,
    });
    console.log("PREFIX: ", env_1.env.app.routePrefix);
    await app.listen(env_1.env.app.port || 4014);
}
bootstrap();
//# sourceMappingURL=main.js.map