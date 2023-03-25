"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCurrentUser = void 0;
const common_1 = require("@nestjs/common");
exports.GetCurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("user", user);
    if (user === null) {
        throw new common_1.ForbiddenException("Not found");
    }
    if (!user)
        return null;
    if (!data)
        return user;
    return user[data];
});
//# sourceMappingURL=get-current-user.decorator.js.map