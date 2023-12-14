import jwt from 'jsonwebtoken';
import { secret } from '../constant/constant';

// Middleware to check JWT token 
export const authenticate = async (ctx: any, next: any) => {
  const token = ctx.headers.authorization;

  if (!token) {
    ctx.status = 401;
    ctx.body = { message: 'Unauthorized' };
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);
    ctx.state.user = decoded; // Attach the decoded user to the context
    await next();
  } catch (error) {
    ctx.status = 401;
    ctx.body = { message: 'Invalid token' };
  }
};
