import Express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import router from "./routes";

const app: Application = Express();
const bodyParser = Express.json;

//middleware
app.use(cors());
app.use(bodyParser());
dotenv.config();
//routes
// app.use(router);

// server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`[Server]: server started on port ${port}`);
});
