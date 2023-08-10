const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const orderRouter = require('./orders/orderRoutes');
dotenv.config({ path: './config.env' });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/orders', orderRouter);
app.all('*', (req, res, next) => {
    res.status(400).json({ message: `Can't find ${req.originalUrl} on this server!`});
});
  
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('DB is connected !!');
    app.listen(3000, () => {
        console.log('Node App is LIVE !!');
    })
})
.catch(err => {
    console.log(err);
});

module.exports = app;