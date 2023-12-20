const express = require('express')
const app = express();
require("dotenv").config()
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

(async () => {
await prisma.$queryRaw`SELECT 1`.catch(err => {
    console.error("Database Connection Failed")
}).then(res => {
    console.log("Database Connected Successfully")
})}) ()

const port = process.env.PORT || 3000

app.use(express.json())
app.get("/", (req, res) => { res.send(`Server says "Hi"`) })
app.use("/orders", require("./routes/orders"));
app.use("/services", require("./routes/services"));

app.listen(port, () => {
    console.log("Server is listening on port ", port);
})