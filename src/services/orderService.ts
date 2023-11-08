import mongoose from 'mongoose';
import Order from '../schemas/orderSchema';
import Service from '../schemas/serviceSchema';
import { createOrderDTO } from './orderServiceDTO';

export class orderService {
  private orderModel;
  private serviceModel;

  constructor() {
    this.orderModel = Order;
    this.serviceModel = Service;
  }

  public getAllOrders = async () => {
    try {
      const orders = await this.orderModel
        .find()
        .populate('services', '_id')
        .select('-__v');
      return orders;
    } catch (error) {
      throw error;
    }
  };

  public getOrderById = async (id: String) => {
    try {
      const order = await this.orderModel
        .findById(id)
        .populate('services', '_id') // populate services with only _id
        .select('-__v');
      return order;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Returns an array of orders within 3 hours of the datetime provided (excluding the order being updated)
   * @param datetime - a valid date string in ISO format
   * @param id - optional id of the order being updated
   * @returns - an array of orders within 3 hours of the datetime provided (excluding the order being updated)
   */
  public getExistingOrdersWithinThreeHours = async (
    datetime: Date,
    id?: String
  ) => {
    // checking if there are any orders within the last 3 hours of the new order
    // if there are, throw an error
    const dataDatetime = new Date(datetime);
    const threeHoursAgo = new Date(dataDatetime.getTime() - 3 * 60 * 60 * 1000);
    const threeHoursLater = new Date(
      dataDatetime.getTime() + 3 * 60 * 60 * 1000
    );

    /* 
      This limitation is in place to guarantee that orders are placed at least a certain amount of time apart,
      which may be required for operational or logistical reasons depending on the application.
      */
    const query = {
      datetime: { $gte: threeHoursAgo, $lte: threeHoursLater },
    };

    // if id is provided, exclude the current order being updated
    if (id) {
      query['_id'] = { $ne: id }; // this is exclusive to the updateOrder function
    }

    const existingOrdersWithinThreeHours = await this.orderModel.find(query);
    return existingOrdersWithinThreeHours;
  };

  public createOrder = async (data: createOrderDTO) => {
    try {
      const existingOrdersWithinThreeHours =
        await this.getExistingOrdersWithinThreeHours(data.datetime);

      if (existingOrdersWithinThreeHours.length > 0) {
        throw new Error(
          'Cannot create order within 3 hours of a pre-existing order'
        );
      }

      const order = await this.orderModel.create(data);
      return order;
    } catch (error) {
      throw error;
    }
  };

  public updateOrder = async (id: String, data: createOrderDTO) => {
    try {
      const order = await this.orderModel.findById(id);
      if (!order) {
        throw new Error('Order not found');
      }

      const existingOrdersWithinThreeHours =
        await this.getExistingOrdersWithinThreeHours(data.datetime, id);

      if (existingOrdersWithinThreeHours.length > 0) {
        throw new Error(
          'Cannot update order within 3 hours of a pre-existing order'
        );
      }

      order.datetime = data.datetime || order.datetime;
      order.totalfee = data.totalfee || order.totalfee;
      order.services = data.services || order.services;

      await order.save();
      return order;
    } catch (error) {
      throw error;
    }
  };

  public deleteOrder = async (id: string) => {
    try {
      const order = await this.orderModel.findById(id);
      if (!order) {
        throw new Error('Order not found');
      }
      await this.orderModel.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  };
}
