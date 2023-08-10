const db = require('../db/db')

class OrderModel {
    async createOrder(orderData){
        try{
            const { datetime, totalfee, services } = orderData


            const mysqlDatetime = new Date(datetime).toISOString().slice(0, 19).replace('T', ' ')

            const insertOrderQuery ='INSERT INTO orders (datetime, totalfee) VALUES (?, ?)'
            const insertOrderValues = [mysqlDatetime, totalfee]

            const insertOrderResult = await db.execute(insertOrderQuery, insertOrderValues)
            const newOrderId = insertOrderResult[0].insertId
//console.log(newOrderId)
            const insertOrderServicesQuery = 'INSERT INTO order_services (order_id, service_id) VALUES (?, ?)'

            for (const service of services) {
                const insertOrderServicesValues = [newOrderId, service.id]
                await db.execute(insertOrderServicesQuery, insertOrderServicesValues)
            }

            return { id: newOrderId, datetime, totalfee, services }
        }catch (error) {
            throw error
        }
    }


    async getAllOrders(){
        try{
            const selectAllOrdersQuery = 'SELECT * FROM orders';

            console.log(selectAllOrdersQuery)


            const [rows,fields] = await db.execute(selectAllOrdersQuery);



          //  console.log('order data',rows)
            return rows



        }catch(error){
            console.error('Error executing query:', error);
        }
    }


    async getOrderById(orderId){
        try{

            const selectOrderQuery = 'Select * From orders Where id = ?'

            const [rows, fields] = await db.execute(selectOrderQuery,[orderId])

           // console.log(order)
            return rows
        }catch(error){
            throw error
        }
    }

    async updateOrder(orderId, updatedData) {
        try {

           // console.log('here',updatedData)
            const updateOrderQuery = 'Update orders Set datetime = ?, totalfee = ? Where id =?'

            const mysqlDatetime = new Date(updatedData.datetime).toISOString().slice(0, 19).replace('T', ' ')
            const updateOrderValues = [mysqlDatetime, updatedData.totalfee, orderId]

            await db.query(updateOrderQuery, updateOrderValues)
            return {id: orderId, ...updatedData}
        } catch (error) {
            throw error
        }
    }

    async deleteOrder(orderId){
        try{

            const deleteQuery = 'DELETE From orders Where id = ?'
            await db.query(deleteQuery,[orderId])
        }catch (e){
            throw e
        }
    }
}

module.exports = OrderModel