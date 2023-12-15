import { TableNames } from '../constant/index.js';
import Database from '../connection/mysql.connection.js';

class OrderModel {
    constructor() {
        this.table = TableNames.Orders
    }

    async getOrderById(orderId){
        const [result] = await Database.query(`SELECT * from ?? where order_id = ?`,[this.table, orderId]);
        return result && result.length ? result[0] : null;
    }
    
    async getOrders(offset, limit){
        const [result] = await Database.query(`SELECT * from ?? LIMIT ? OFFSET ?`,[this.table, limit, offset]);
        return result && result.length ? result : [];
    }
    
    async createOrder(orderData){
        const [result] = await Database.query(`INSERT into ?? SET ?`,[this.table, {
            total_fee : orderData.total_fee,
            service_ids: orderData.service_ids.join(",")
        }]);
        return result && result.affectedRows ? { order_id : result.insertId} : false;
    }
    
    async deleteOrderById(orderId){
        const [result] = await Database.query(`DELETE FROM ?? WHERE order_id = ?`,[this.table, orderId]);
        return result && result.affectedRows ? true : false;
    }
    
    async updateOrder(orderId, totalFee, serviceIds){
        const [result] = await Database.query(`UPDATE ?? SET ? WHERE order_id = ?`,[this.table, {
            total_fee : totalFee,
            service_ids: serviceIds.join(",")
        }, orderId]);
        return result && result.affectedRows ? true : false;
    }

    async checkOrderExists(fromTime, toTime){
        const [result] = await Database.query(`SELECT order_id from ?? where created_at BETWEEN ? AND ?`,[this.table, fromTime, toTime]);
        return result && result.length ? true : false;
    }
}
export default new OrderModel();