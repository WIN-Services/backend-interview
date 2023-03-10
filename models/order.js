const db = require('../models/conn');

class Order {
  constructor(id, datetime, totalfee, services) {
    this.id = id;
    this.datetime = datetime;
    this.totalfee = totalfee;
    this.services = services;
  }

  static async getAll() {
    const query = 'SELECT * FROM orders';
    const { rows } = await db.query(query);
    return rows
  }

  static async getById(id) {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const { rows } = await db.query(query, [id]);

    if (rows?.length === 0) {
      return null;
    }

    const { datetime, totalfee, services } = rows??[0];

    return new Order(id, datetime, totalfee, services);
  }

  static async create(datetime, totalfee, services) {
    const query =
      'INSERT INTO orders (datetime, totalfee, services) VALUES ($1, $2, $3) RETURNING *';
    const values = [datetime, totalfee, services];
    const { rows } = await db.query(query, values);

    const { id } = rows??[0];

    return new Order(id, datetime, totalfee, services);
  }
  
  static async checkOrderId(id) {
    const query = 'SELECT * FROM orders WHERE id = $1';
    const { rows } = await db.query(query, [id]);

    if (rows?.length > 0) {
      return true;
    }

    return false;
  }

  static async checkExistingOrders(datetime) {
    const currentTime = new Date(datetime).getTime();
    const threeHoursAgo = currentTime - 3 * 60 * 60 * 1000;
    const query = 'SELECT * FROM orders WHERE datetime >= $1 AND datetime <= $2';
    const { rows } = await db.query(query, [new Date(threeHoursAgo), new Date(currentTime)]);

    if (rows?.length > 0) {
      return true;
    }

    return false;
  }

  static async update(id, datetime, totalfee, services) {
    const query = 'UPDATE orders SET datetime = $1, totalfee = $2, services = $3 WHERE id = $4 RETURNING *';
    const values = [new Date(datetime), totalfee, services, id];
    const { rows } = await db.query(query, values);

    if (rows?.length === 0) {
      return null;
    }

    const { id: orderId, datetime: orderDatetime, totalfee: orderTotalFee, services: orderServices } = rows??[0];

    return new Order(orderId, orderDatetime, orderTotalFee, orderServices);
  }

  static async delete(id) {
    const query = 'DELETE FROM orders WHERE id = $1';
    await db.query(query, [id]);
  }
}

module.exports = Order;