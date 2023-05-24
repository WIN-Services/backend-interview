let mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION_URL).then(
    con=>{console.log("db connection is successful")}
)
.catch(
    err=>{
        console.log("db connection failed");
    }
)

