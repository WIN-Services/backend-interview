import express, { Express, Request, Response, json, urlencoded, NextFunction } from "express";
import orderRouter from './routes/v1/orders'
import serviceRouter from './routes/v1/services'
import userRouter from './routes/v1/users'
import utilsRouter from "./routes/v1/utilsr";

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(json())
app.use(urlencoded({ extended: true }))

app.use('/api/v1/users', userRouter)
app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/utils', utilsRouter)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ msg: "Some internal error occured", err: err })
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
}).on("error", (err: Error) => {
    console.log(err);
    process.exit(1);
})

export default app