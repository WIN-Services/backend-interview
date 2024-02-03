import dotenv from "dotenv";
dotenv.config();

(async () => {
  await require("./database/connection");
  await require("./runServer");
  await require("./routes");
})();
