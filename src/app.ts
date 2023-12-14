import Koa from 'koa';
import Router from 'koa-router';
import Body from 'koa-body'
import { authenticate } from './middleware/authenticate';
import { login } from './handler/login/login';
import { signUp } from './handler/user/user';
import { createOrder, deleteOrder, getOrder, getOrderById, updateOrder } from './handler/order/order';

const body = Body()

export const app = new Koa
const router = new Router();

// Route for signUp
router.post('/signUp', signUp);


router.post('/login', login);

// order routes
router.post('/createOrder', authenticate, createOrder)
router.put('/updateOrder/:id', authenticate, updateOrder)
router.delete('/deleteOrder/:id', authenticate, deleteOrder)
router.get('/getOrder', authenticate, getOrder)
router.get('/getOrder/:orderId', authenticate, getOrderById)

app.use(body); // Parse request body
app.use(router.routes()); // Use defined routes

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
