import { pool } from '../node-postgres';
import { TABLES } from '../constant/tables';
import { IService, IOrders } from '../interfaces';

const { service, order, order_service } = TABLES;

export default class DatabaseService {
  private getOrderQuery() {
    return `SELECT O.${order.totalfee}, O.${order.datetime}, OS.${order_service.order_id}, OS.${order_service.service_id}, S.${service.name}
    FROM ${order.table_name} AS O 
    INNER JOIN ${order_service.table_name} AS OS 
    ON O.${order.order_id} = OS.${order_service.order_id} AND O.${order.active} = true
    INNER JOIN ${service.table_name} AS S 
    ON OS.${order_service.service_id} = S.${service.service_id}
    `;
  }

  private modifyOrder(ordersResult: any) {
    const orderMap = new Map();
    for (const orders of ordersResult) {
      const orderExist = orderMap.get(orders['order_id']);
      if (orderExist) {
        orderExist['services'] = [
          ...orderExist['services'],
          { id: orders[service.service_id], [service.name]: orders[service.name] },
        ];
        orderMap.set(orders[order.order_id], orderExist);
      } else {
        const obj = {
          id: orders[order.order_id],
          [order.totalfee]: orders[order.totalfee],
          [order.datetime]: orders[order.datetime],
          services: [{ id: orders[service.service_id], [service.name]: orders[service.name] }],
        };
        orderMap.set(orders['order_id'], obj);
      }
    }
    const orders = [];
    for (const value of orderMap.values()) {
      orders.push(value);
    }
    return orders;
  }

  private modifyService(servicesResult: any) {
    const serviceArray = [];
    for (const services of servicesResult) {
      serviceArray.push({
        id: services[service.service_id],
        [service.name]: services[service.name],
        [service.fee]: services[service.fee],
      });
    }

    return serviceArray;
  }

  async getAllServices(): Promise<IService[] | null> {
    const result = await pool.query(`SELECT * FROM ${service.table_name}`);
    if (result.rowCount) {
      return this.modifyService(result.rows) as unknown as IService[];
    }

    return null;
  }

  async getServiceById(id: number): Promise<IService | null> {
    const result = await pool.query(`SELECT * FROM ${service.table_name} WHERE ${service.service_id} = ${id}`);
    if (result.rowCount) {
      return this.modifyService(result.rows)[0] as unknown as IService;
    }

    return null;
  }

  async getServicesByIds(id: number[]): Promise<IService[] | null> {
    const result = await pool.query(
      `SELECT * FROM ${service.table_name} WHERE ${service.service_id} IN (${id.join(',')})`,
    );
    if (result.rowCount) {
      return this.modifyService(result.rows) as unknown as IService[];
    }

    return null;
  }

  async getAllOrders(): Promise<IOrders[] | null> {
    const result = await pool.query(this.getOrderQuery());

    if (result.rowCount) {
      return this.modifyOrder(result.rows) as unknown as IOrders[];
    }

    return null;
  }

  async getOrderById(id: number): Promise<IOrders | null> {
    const result = await pool.query(`${this.getOrderQuery()} WHERE O.${order.order_id} = ${id}`);
    if (result.rowCount) {
      return this.modifyOrder(result.rows)[0] as unknown as IOrders;
    }

    return null;
  }

  async getOrdersByIds(id: number[]): Promise<IOrders[] | null> {
    const result = await pool.query(`${this.getOrderQuery()} WHERE O.${order.order_id} IN (${id.join(',')})`);
    if (result.rowCount) {
      return this.modifyOrder(result.rows) as unknown as IOrders[];
    }

    return null;
  }

  async deleteOrder(id: number): Promise<void> {
    await pool.query(`UPDATE ${order.table_name} SET ${order.active} = false WHERE ${order.order_id} = ${id}`);
  }

  async createOrder(serviceId: number[], totalfee: number): Promise<number> {
    const client = await pool.connect();
    try {
      client.query('BEGIN');
      const result = await client.query(
        `INSERT INTO ${order.table_name} (${order.totalfee}, ${
          order.datetime
        }) VALUES (${totalfee}, '${new Date().toISOString()}') returning ${order.order_id}`,
      );

      const orderId = result.rows[0][order.order_id];

      const orderAndServiceValue = [];
      for (const id of serviceId) {
        orderAndServiceValue.push(`(${orderId}, ${id})`);
      }

      await client.query(
        `INSERT INTO ${order_service.table_name} (${order_service.order_id}, ${
          order_service.service_id
        }) VALUES ${orderAndServiceValue.join(',')}`,
      );
      await client.query('COMMIT');

      return orderId;
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  }

  async editOrder(orderId: number, serviceId: number[], totalfee: number): Promise<number> {
    const client = await pool.connect();
    try {
      client.query('BEGIN');
      await client.query(
        `UPDATE ${order.table_name} SET ${order.totalfee} = ${totalfee}, ${
          order.datetime
        } = '${new Date().toISOString()}' WHERE ${order.order_id} = ${orderId}`,
      );

      const orderAndServiceValue = [];
      for (const id of serviceId) {
        orderAndServiceValue.push(`(${orderId}, ${id})`);
      }

      await client.query(`DELETE FROM ${order_service.table_name} WHERE ${order_service.order_id} = ${orderId}`);
      await client.query(
        `INSERT INTO ${order_service.table_name} (${order_service.order_id}, ${
          order_service.service_id
        }) VALUES ${orderAndServiceValue.join(',')}`,
      );
      await client.query('COMMIT');
      return orderId;
    } catch (err) {
      await client.query('ROLLBACK');

      throw err;
    }
  }
}
