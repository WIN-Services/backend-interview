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
exports.Utility = void 0;
const common_1 = require("@nestjs/common");
const pagination_types_1 = require("../types/pagination.types");
const winston_1 = require("winston");
let Utility = class Utility {
    constructor(logger) {
        this.logger = logger;
    }
    convertRowDataListToList(data) {
        if (!data) {
            return [];
        }
        return Object.values(JSON.parse(JSON.stringify(data)));
    }
    convertArrayToString(array) {
        return array
            .map(function (a) {
            return "'" + a.replace("'", "''") + "'";
        })
            .join();
    }
    getPagination(page, pageSize) {
        if (!page)
            page = 1;
        if (!pageSize)
            pageSize = 30;
        page = page - 1;
        const skip = page <= 0 ? 0 : page * pageSize;
        const limit = +(Number.isNaN(pageSize) ? 30 : pageSize);
        return {
            skip,
            limit,
            page: page + 1,
        };
    }
};
Utility = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('winston')),
    __metadata("design:paramtypes", [winston_1.Logger])
], Utility);
exports.Utility = Utility;
//# sourceMappingURL=utility.js.map