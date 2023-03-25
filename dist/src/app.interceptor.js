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
exports.AppInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const winston_1 = require("winston");
let AppInterceptor = class AppInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const { method, url, headers, body } = req;
        const requestData = {
            host: headers.host,
            userAgent: headers['user-agent'],
            contentLength: headers['content-length'],
            body: body,
        };
        this.logger.info(`Request - ${method}: ${url}`, requestData);
        return next.handle().pipe((0, rxjs_1.map)((data) => ({
            code: context.switchToHttp().getResponse().statusCode,
            message: data['message'] ? data['message'] : 'Success',
            data: this.removeMessageKey(data),
        })));
    }
    removeMessageKey(data) {
        data['message'] ? delete data['message'] : null;
        return Object.keys(data).length > 0 ? data : null;
    }
};
AppInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('winston')),
    __metadata("design:paramtypes", [winston_1.Logger])
], AppInterceptor);
exports.AppInterceptor = AppInterceptor;
//# sourceMappingURL=app.interceptor.js.map