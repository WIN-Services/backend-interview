import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { db } from "./config/db";
import { Routes } from "./src";

dotenv.config();
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/v1/", Routes);


app.listen(process.env.ENV !== 'test' ? PORT : 0, async() => {
  await db();
  
  console.log(`Listening on port ${PORT}`);
});

export default app;