const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  port: process.env.PORT,
  dbusername: process.env.DBUSERNAME,
  dbpassword: process.env.DBPASSWORD,
  dbcluster: process.env.DBCLUSTER,
  dbname: process.env.DBNAME,
  auth: process.env.AUTH,
};
