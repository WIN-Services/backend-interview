const express = require('express');
const connectDB = require('./database/mongodb');
const dotenv = require('dotenv');
const app = express();

//load environment variables
dotenv.config();

//connect database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

//Testing route
app.get('/', (req, res) => res.send('API Running'));

//Define routes
app.use('/api/order', require('./routes/order.route'));
app.use('/api/service', require('./routes/service.route'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

module.exports = app;