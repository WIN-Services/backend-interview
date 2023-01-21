const pool = require('../model/db')



const createOrder = async (data) => {
    try{
        let error = new Error()
        let services = data.services;

        let ids = ""
        for(let ele of services){
            ids+=ele+",";
        }
        if(ids.length == 0){
            error.status = 400
            error.message = 'Invalid input data'
            throw error
        }

        ids = ids.slice(0, -1);
        let feeQuery = `SELECT fee FROM services WHERE id IN (${ids})`
        let fees = await pool.query(feeQuery);
        fees = fees.rows;
        if(fees.length == 0 || fees.length != services.length){
            error.status = 400
            error.message = 'Invalid input data'
            throw error
        }

        let totalFees = 0;
        await fees.forEach(function(ele){
            totalFees+=ele.fee;
        });

        const date = new Date();
        let query = "INSERT INTO orders (datetime, totalfee, services) VALUES ($1, $2, $3) RETURNING *"
        const results = await pool.query(query, [date, totalFees, services]);
        return {data: results.rows};
    }catch(e){
        console.log(e)
        throw e
    }
}


const getOrderById = async (data) => {
    try{
        let error = new Error()
        let id = data;
        let query;
        if(id){
            query = `SELECT * FROM orders WHERE id = ${id}`;
        }else{
            query = `SELECT * FROM orders`;
        }
        let order = await pool.query(query);
        order = order.rows;
        if(order.length == 0){
            error.status = 400
            error.message = 'Invalid service order id'
            throw error
        }
        return {success: true, data: order};
    }catch(e){
        console.log(e.message)
        throw e
    }
}

const updateOrder = async (id, data) => {
    try{
        let error = new Error()
        let services = data;
        if(!services){
            error.status = 400
            error.message = 'Invalid service orders'
            throw error
        }
        let query1 = `SELECT services, datetime, totalfee FROM orders WHERE id = ${id}`
        
        let order = await pool.query(query1);
        order = order.rows;
        if(order.length == 0 || order.length !== 1){
            error.status = 400
            error.message = 'Invalid order id'
            throw error
        }
        order = order[0];
        
        let diff = Math.abs(new Date() - new Date(order.datetime)) / 1000;
        diff = Math.floor(diff / 60) % 60;
        if(diff < 180){
            error.status = 400
            error.message = 'Recently created order'
            throw error
        }

        console.log(diff)
        let ids = ""
        for(let ele of services){
            ids+=ele+",";
        }


        ids = ids.slice(0, -1);
        let feeQuery = `SELECT fee FROM services WHERE id IN (${ids})`
        let fees = await pool.query(feeQuery);
        fees = fees.rows;
        if(fees.length == 0 || fees.length !== services.length){
            error.status = 400
            error.message = 'Invalid service ids'
            throw error
        }

        services = [...services, ...order.services]

        let totalFees = 0;
        await fees.forEach(function(ele){
            totalFees+=ele.fee;
        });
        totalFees+=order.totalfee;
        let query = `update orders set services = $1, totalfee = $2 where id = $3`
        const results = await pool.query(query, [services, totalFees, id]);
        return {data: "Updated successfully"};
    }catch(e){
        console.log(e.message)
        throw e
    }
}


const deleteOrder = async (id) => {
    try{
        let error = new Error()
        if(!id){
            error.status = 400
            error.message = 'Invalid order id'
            throw error
        }
        let query = `DELETE FROM orders WHERE id = $1`
        const results = await pool.query(query, [id]);
        if(results.rowCount != 1){
            error.status = 400
            error.message = 'Invalid order id'
            throw error
        }
        return {success: true, message: "Deleted successfully"};
    }catch(e){
        console.log(e.message)
        throw e
    }
}

module.exports = {
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder
  }