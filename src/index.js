require('dotenv').config();

const express =require('express')
const mongoose = require('mongoose')
const orderRoutes = require('./routes/orderRoutes')
const port = process.env.PORT 
const mongoUrl = process.env.MONGO_URL 
const app = express()
app.use(express.json())
app.use('/api', orderRoutes)

mongoose
  .connect(mongoUrl)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  })
  .catch((error) => console.error('MongoDB connection error: ', error))

module.exports = app  