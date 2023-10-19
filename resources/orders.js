const db = require('./../db/access');
const format = require('pg-format');
const { CustomError,DatabaseError } = require('../objects/errors')

// Please notice I am not using any orm for simplicity purposes
const Orders = {
    getAllOrders : async function(){
        // later it can be extended to bring only orders of current user
        try{
            let dbData = await db.query(`select o.*,osm.service_id from 
            orders o 
            inner join orders_services_mapping osm on o.id = osm.order_id
            where o.is_deleted = false`);
            let orderIdToServicesMap = {};
            dbData.forEach((row) => {
                if(orderIdToServicesMap[row.id])
                    orderIdToServicesMap[row.id].push({ "id"  : row.service_id})
                else
                    orderIdToServicesMap[row.id] = [{ "id"  : row.service_id}]
            });
            let returnData = dbData.map((row) => {
                return {
                    "id": row.id,
                    "datetime": row.datetime,
                    "totalfee": row.totalfee,
                    "services": orderIdToServicesMap[row.id] || []
                }
            });
            return returnData;
        }
        catch(err){
            throw err;
        }
    },
    addOrder : async function({ totalFees,servicesUsed }){
        try{
            await checkLastOrderValidation();
            let dbClient = await db.startDbTransaction();
            let newOrder = await dbClient.safeQuery(`Insert into orders(totalFees) values($1) returning *`,[totalFees]);
            newOrder = newOrder[0];
            let servicesToAdd = servicesUsed.map((service) => {
                return [
                    newOrder.id,
                    service.id
                ]
            });
            let servicesQuery = format('Insert into orders_services_mapping(order_id,service_id) values %L',servicesToAdd);
            await dbClient.safeQuery(servicesQuery);
            await dbClient.commitTrans();
            return newOrder;
        }
        catch(err){
            if(err.code === '23503'){
                throw new CustomError(`Invalid service id`,101)
            }
            throw err;
        }
    },
    updateOrder : async function(orderId,{ newtotalFees,newservicesUsed }){
        try{
            let dbClient = await db.startDbTransaction();
            await dbClient.safeQuery(`update orders set totalFees = $1 where id = $2`,[newtotalFees,orderId]);
            let servicesToAdd = newservicesUsed.map((service) => {
                return [
                    orderId,
                    service.id
                ]
            });
            let servicesQuery = format('Insert into orders_services_mapping(order_id,service_id) values %L',servicesToAdd);
            await dbClient.safeQuery(servicesQuery);
            await dbClient.commitTrans();
        }
        catch(err){
            console.log(err);
            if(err.code === '23503'){
                throw new CustomError(`Invalid service id`,101);
            }
            throw err;
        }
    },
    deleteOrder : async function(orderId){
        try{
            let dbClient = await db.startDbTransaction();
            await dbClient.safeQuery(`update orders set is_deleted = true where id = $1`,[orderId]);
            await dbClient.commitTrans();
        }
        catch(err){
            throw err;
        }
    }
}

async function checkLastOrderValidation(){
    let data = await db.query(`select count(*) from orders
    where datetime >= ( now() - INTERVAL '3 hours' )
    and is_deleted = false `)
    if(data.length && data[0].count && data[0].count > 0)
        throw new CustomError('Cannot create order now',100);
}

module.exports = Orders