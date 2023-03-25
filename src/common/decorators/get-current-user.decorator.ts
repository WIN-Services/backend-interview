import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("user", user);
    if (user === null) {
      throw new ForbiddenException("Not found");
    }
    if (!user) return null;
    if (!data) return user;
    return user[data];
  }
);
