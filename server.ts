import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import orderRouter from './api/orders/ordersRouter';
import { verifyUser } from './utils/userValidator';

dotenv.config()
const app: Express = express();
const port = process.env.PORT;
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    return res.json({ status: "Welcome home" })
})

app.use('/order', verifyUser, orderRouter)

app.listen(port, () => {
    console.log('Listening to port ', port)
})