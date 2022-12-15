import { Request, Response } from "express";
import { ApiErrorCode } from "../exceptions/http.exception";
import { EntityNotFoundException } from "../exceptions/entity-not-found.exception";
import { orderService } from "../services/entities/order.service";
import { OrderCreateDto } from "../dto/order/order-create.dto";
import Ajv from "ajv";
import * as fs from "fs";
import { UnprocessableEntityException } from "../exceptions/unprocessable-entity.exception";
import { OrderUpdateDto } from "../dto/order/order-update.dto";
import { serviceRecordService } from "../services/entities/service-record.service";
import { TooManyRequestException } from "../exceptions/too-many-request.exception";

const ajv = new Ajv();

export class OrderController {
 
  // Show Order on the basis of orderId:
  static async show(req: Request, res: Response) {
    const orderId = +req.params.orderId;
    const order = await orderService.show(orderId);
    if (!order) {
      throw new EntityNotFoundException("Order", ApiErrorCode.ORDER_NOT_FOUND)
    }
    return res.json({data: order});
  }

  // Show All Orders
  static async list(req: Request, res: Response) {
    const orders = await orderService.list();
    return res.json({data: orders})
  }

  // Create Order
  static async create(req: Request, res: Response) {
    const inputData = req.body as OrderCreateDto;
    
    try {
      const schema = JSON.parse(fs.readFileSync("./schema/order/order-create.schema.json").toString());
      await ajv.validate(schema, inputData);
    } catch(e) {
      throw new UnprocessableEntityException(e.errors)
    }

    // Validate Services:
    for (const s of inputData.service_ids) {
      const service = (await serviceRecordService.show(s));
      if (!service) {
        throw new EntityNotFoundException("Service Record", ApiErrorCode.SERVICE_RECORD_NOT_FOUND)
      }
    }

    // Check whether order with same services is created in the past 3 hours or not
    const pastOrder = await orderService.showByServiceIdInPastThreeHours(inputData.service_ids);
    if (pastOrder) {
      throw new TooManyRequestException(
        `Too many request. Cannot create order within 3 hours of previous creation.`,
        ApiErrorCode.TOO_MANY_ORDER_REQUEST
      )
    }

    const order = await orderService.create(inputData);

    return res.json({data: order})
  }

  // Update Order
  static async update(req: Request, res: Response) {
    const orderId = +req.params.orderId;
    const order = await orderService.show(orderId);
    if (!order) {
      throw new EntityNotFoundException("Order", ApiErrorCode.ORDER_NOT_FOUND)
    }
    const inputData = req.body as OrderUpdateDto;

    try {
      const schema = JSON.parse(fs.readFileSync("./schema/order/order-update.schema.json").toString());
      await ajv.validate(schema, inputData);
    } catch(e) {
      throw new UnprocessableEntityException(e.errors)
    }

    // Validate Services:
    for (const s of inputData.service_ids) {
      const service = (await serviceRecordService.show(s));
      if (!service) {
        throw new EntityNotFoundException("Service Record", ApiErrorCode.SERVICE_RECORD_NOT_FOUND)
      }
    }

    // Check whether order with same services is created in the past 3 hours or not
    const pastOrder = await orderService.showByServiceIdInPastThreeHours(inputData.service_ids);
    console.log(pastOrder.createdAt);
    if (pastOrder) {
      throw new TooManyRequestException(
        `Too many request. Cannot update order within 3 hours of creation.`,
        ApiErrorCode.TOO_MANY_ORDER_REQUEST
      )
    }
    
    const updatedOrder = await orderService.update(order, inputData)
    
    return res.json({data: updatedOrder});
  }

  // Delete Order
  static async delete(req: Request, res: Response) {
    const orderId = +req.params.orderId;
    const order = await orderService.show(orderId);
    if (!order) {
      throw new EntityNotFoundException("Order", ApiErrorCode.ORDER_NOT_FOUND)
    }
    await orderService.delete(order)
    return res.json("Deleted Successfully");
  }
}