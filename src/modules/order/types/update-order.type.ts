import {
  CreateNewOrderRequest,
  CreateNewOrderResponse,
} from './create-new-order.type';

export type UpdateOrderRequest = Partial<CreateNewOrderRequest> & {
  orderId: string;
};

export type UpdateOrderResponse = CreateNewOrderResponse;
