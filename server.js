const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const routes = require('./routes')

const app = express()

dotenv.config()

mongoose.connect(process.env.MONGO_URL)

app.listen(process.env.PORT || 3000)

app.use(express.json())

app.use(cors());

app.use('/', routes)