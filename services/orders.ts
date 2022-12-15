
// tslint:disable-next-line:max-file-line-count
// @ts-nocheck
import express = require('express');
import { IOrder, Order } from '../models/orders';
import { Service } from '../models/services';
import mongoose from 'mongoose'
import { Types } from 'mongoose'
import {
  BadRequestError,
  SuccessResponse,
} from '../util/api-response-type';

interface ApiResponse {
  status: number,
  success: boolean,
  data: any
}

export class OrderService {
    protected request: express.Request;
    constructor(req: express.Request){
      this.request = req;
    }

    /**
     * @param {Object} order Order object
     */
    public async getOrders(limit = 500): Promise<ApiResponse> {
      const orders = await Order.find({}).limit(Math.min(limit,500))
      return new SuccessResponse(JSON.parse(JSON.stringify(orders)))
    }

    /**
     * @param {String} orderId orderId string
     */
     public async getOrder(orderId: string): Promise<ApiResponse> {

      if ( !orderId || !Types.ObjectId.isValid(orderId)) {
        return new BadRequestError('orderId not present or is invalid')
      }
      const order = await Order.findById(orderId).lean()
      if (!order) {
        return new BadRequestError("orderId not found")
      }
      return new SuccessResponse(JSON.parse(JSON.stringify(order)))
    }

    /**
     * @param {Object} order Order object
     */
    public async createOrder(order: IOrder): Promise<ApiResponse> {

      if (order.services.find(x=> !Types.ObjectId.isValid(x.id))) {
        return new BadRequestError("Invalid service id passed")
      }

      if (typeof order.totalfee != 'number') {
        return new BadRequestError("totalfee must be an integer")
      }

      const ids = order.services.map(x => new mongoose.Types.ObjectId(x.id));
      // serviceIds in order data should exist in db
      const services = await Service.find({ _id: { $in: ids } })

      if (services.length != ids.length){
        return new BadRequestError("service ids present in request are not present in db")
      }

      const latestOrder = await Order.findOne({}, {}, { sort: { 'created_at' : -1 } }).limit(1).lean()
      if (latestOrder && Date.now(latestOrder.createdAt) > (Date.now() - 3*60*60) ) {
        const timeToCreateAgain = Date.now(latestOrder.createdAt) + 3*60*60
        
        return new BadRequestError(`Last order was made within last 3 hours, please try after ${(timeToCreateAgain - Date.now())}`)
      }

      const res  = await Order.create(order)
      return new SuccessResponse(JSON.parse(JSON.stringify(res)))
    }

    /**
     * @param {Object} order Order object
     */
     public async updateOrder(order: IOrder): Promise<ApiResponse> {

      if (!order || !order._id) {
        return new BadRequestError("order or orderId is missing")
      }

      if(typeof order.totalfee != Number){
        return new BadRequestError("totalfee must be an integer")
      }
      id = order._id
      delete order._id
      const res = await Order.findOneAndUpdate({ _id: id }, order)
      return new SuccessResponse(JSON.parse(JSON.stringify(res)))
    }

    /**
     * @param {String} orderId orderId string
     */
     public async deleteOrder(orderId: string): Promise<ApiResponse> {
      if ( !orderId || !Types.ObjectId.isValid(orderId)) {
        return new BadRequestError("orderId not present or is invalid")
      }
      const res  = await Order.findOneAndDelete({_id: orderId})
      if (!res) {
        return new BadRequestError('invalid orderId present, unable to delete order')
      }
      return new SuccessResponse(JSON.parse(JSON.stringify(res)))
    }
}

