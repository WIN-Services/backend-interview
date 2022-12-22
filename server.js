const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const app = express()
const routeOrders = require('./Router/routeData')

const port = process.env.PORT || 5000
app.use(express.json())
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.status(400).send('something is broken')
})

app.use('/api/v1/orders',routeOrders)
var server = app.listen(port,async(error)=>{
    if(!error){
        console.log(`listening on port ${port}`)
        }
        else
        console.log('Error occured, Server cannot start',error)
})

module.exports = server
