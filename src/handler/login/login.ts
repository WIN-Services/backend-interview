import jwt from "jsonwebtoken";
import { secret } from "../../constant/constant";
import { loginCred } from "../../modals/loginModal";
import { getUser } from "../../store/user/userStore";

export const login = async (ctx: any): Promise<any> => {
  try {
    //schema validation
    const reqBody = loginCred.parse(ctx.request.body);
    const users = await getUser(reqBody);
    const user = users?.find(
      (user: any) =>
        user.user_name === reqBody.userName && user.password === reqBody.password
    );
    if (user) {
      const token = jwt.sign(reqBody, secret, { expiresIn: "1h" });
      ctx.body = { message: `user is authenticated. Token is ${token}` };
    } else {
      {
        ctx.status = 404;
        ctx.body = { message: "user not found" };
      }
    }
  } catch (err: any) {
    {
      ctx.status = 401;
      ctx.body = { message: "Invalid credentials" };
    }
  }
};
