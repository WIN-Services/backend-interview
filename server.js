import express from "express";
import "./config/db.js";
import router from "./routes/index.js";
const app = express();
const port = process.env.PORT || 3000;

// loading all routes
app.use("/", router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
