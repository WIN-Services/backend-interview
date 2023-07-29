console.log("Start");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users.routes.js"); //users routes
const orderRoutes = require("./routes/orders.routes.js"); //orders routes

app.use(express.json());
app.use(morgan());
app.use(cors());
app.use("/api",userRoutes.router);
app.use("/api", orderRoutes);

//Listening the app on PORT 3000
app.listen(3000, () => {
  console.log(`Backend Server is Running On : 3000`);
});
