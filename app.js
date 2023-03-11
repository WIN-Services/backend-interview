require('dotenv').config();
const express = require('express')

//server routes 
const orderRoutes = require('./routes/order')

//sequelize db dependecy injected at runtime to make it loose coupled. helps to provide testing or even mock db as well.
module.exports = async function(sequelize) {
    console.log("initialising...")
    await startDB(sequelize);

    const app = express()
    
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.use(orderRoutes)
    
    app.get('/', (req, res) => {
        console.log('GET / homepage request')
        res.status(200).send('Hello World!')
    })
    
    return app;
}

async function startDB(sequelize){
    try {
        await sequelize.sync({force: true})
        console.log('connection established to postgres');
        return true;
    } catch (err) {
        console.log('Error in connecting to Postgres db', err);
        throw "unable to connect postgres db";
    }
}