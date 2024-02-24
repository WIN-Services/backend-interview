import express, { Express } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";

const app: Express = express();

app.use(express.json());
app.use("/api", rootRouter);

export const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

const server = app.listen(PORT, () => {
  console.log(`app is running at port: ${PORT}`);
});

export { app, server };
