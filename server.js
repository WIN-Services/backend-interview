import express from "express";
import "./config/db.js";
import router from "./routes/index.js";
const app = express();
const port = process.env.PORT || 3000;

// use for parsing body from a form
app.use(express.urlencoded({ extended: true }));

// loading all routes
app.use("/", router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
