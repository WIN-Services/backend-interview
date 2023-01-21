const express = require('express')
const app = express();
const dotenv = require('dotenv');
const ordersRouter = require("./router");

dotenv.config()
app.use(express.json());

const pool = require('./model/db')

let a = async() => {
    const results = await pool.query("select * from services")
    console.log(results.rows)

}
// a()
app.get("/", (req, res) => {
    res.status(200).send("Hello, this in home page")
})
app.use("/api/orders", ordersRouter);

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening on ${port}`)
})