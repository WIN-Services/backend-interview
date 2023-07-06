const app = require('express')
const bodyParser = require('body-parser')
const port = 3000



const orders = require('./api/routes/orderRouter')
console.log('hellooooo')
app.use(bodyParser.json());
app.use('/api/order-management-system', orders)


app.listen(port, () => {
    console.log(`Server is running on Port : ${port}`)
})