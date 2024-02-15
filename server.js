const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());


app.use(routes);

// app run on port 3000
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`server listening on port ${port}`);
});