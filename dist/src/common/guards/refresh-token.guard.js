"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenGuard = void 0;
const passport_1 = require("@nestjs/passport");
class RefreshTokenGuard extends (0, passport_1.AuthGuard)('jwt-refresh') {
    constructor() {
        super();
    }
}
exports.RefreshTokenGuard = RefreshTokenGuard;
//# sourceMappingURL=refresh-token.guard.js.map