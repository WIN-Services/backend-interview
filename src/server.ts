import * as cors from "cors";
import app from "./app";
import Logger from "./utils/winston-logger";
import sequelize from './models/db.sequelize'
require("dotenv").config();
const PORT = process.env.PORT || 3002;
const corsOptions = {
  origin: "*",
};
sequelize.sync()
app.use(cors(corsOptions));

app.listen(PORT, () => Logger.info(`App listening on port ${PORT}!`));
