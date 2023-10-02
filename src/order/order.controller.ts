import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.model';
import {CreateOrderDto} from "./dto/create-order.dto";

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Post()
  createOrder(@Body() order: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(order);
  }

  @Put(':id')
  updateOrder(@Param('id') id: string, @Body() order: Order): Promise<Order> {
    return this.orderService.updateOrder(id, order);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string): Promise<void> {
    return this.orderService.deleteOrder(id);
  }
}

// [
//   {
//     "id": 1,
//     "datetime": "2023-10-02T12:32:27.496Z",
//     "totalFee": 200,
//     "createdAt": "2023-10-02T12:32:27.498Z",
//     "updatedAt": "2023-10-02T12:32:27.498Z",
//     "services": [
//       {
//         "id": 1,
//         "name": "Inspection",
//         "createdAt": "2023-10-02T11:52:19.512Z",
//         "updatedAt": "2023-10-02T11:52:19.512Z",
//         "OrderServiceRecord": {
//           "id": 1,
//           "orderId": 1,
//           "serviceRecordId": 1,
//           "createdAt": "2023-10-02T12:32:40.309Z",
//           "updatedAt": "2023-10-02T12:32:40.309Z"
//         }
//       },
//       {
//         "id": 3,
//         "name": "Testing",
//         "createdAt": "2023-10-02T11:53:15.688Z",
//         "updatedAt": "2023-10-02T11:53:15.688Z",
//         "OrderServiceRecord": {
//           "id": 2,
//           "orderId": 1,
//           "serviceRecordId": 3,
//           "createdAt": "2023-10-02T12:32:40.309Z",
//           "updatedAt": "2023-10-02T12:32:40.309Z"
//         }
//       },
//       {
//         "id": 4,
//         "name": "Analysis",
//         "createdAt": "2023-10-02T11:53:43.068Z",
//         "updatedAt": "2023-10-02T11:53:43.068Z",
//         "OrderServiceRecord": {
//           "id": 3,
//           "orderId": 1,
//           "serviceRecordId": 4,
//           "createdAt": "2023-10-02T12:32:40.309Z",
//           "updatedAt": "2023-10-02T12:32:40.309Z"
//         }
//       }
//     ]
//   }
// ]