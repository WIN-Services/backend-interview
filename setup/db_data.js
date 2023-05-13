require('dotenv').config();
const {dbUtil} = require('./../db')
dbUtil.connect()

const Service = require('./../models/service')
const OrderCounter = require('./../models/orderCounter')

const addServiceDataInDB = async () => {
    try{
        await Service.insertMany([
            { name: 'Inspection', serviceId: 123, price: 100, createdAt: new Date(), updatedAt: new Date()},
            { name: 'Testing', serviceId: 456, price: 100, createdAt: new Date(), updatedAt: new Date()},
            { name: 'Analysis', serviceId: 789, price: 100, createdAt: new Date(), updatedAt: new Date()}
        ])
        
    } catch(error){
        console.log(error)
    }
}

const initializeCounter = async() => {
    try{
        await OrderCounter.insertMany([
            { orderCounter: 100 }
        ])
        
    } catch(error){
        console.log(error)
    } finally{
        process.exit()
    }
}

addServiceDataInDB()
initializeCounter()

