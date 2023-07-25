import { OrderResponse } from './order.type';

export const ORDER_MESSAGES = {
  NOT_FOUND: new OrderResponse(404, 'ORDER NOT FOUND!'),
  ORDER_CREATED: new OrderResponse(201, 'ORDER CREATED!'),
  ORDER_UPDATED: new OrderResponse(200, 'ORDER UPDATED!'),
  ORDER_DELETED: new OrderResponse(200, 'ORDER DELETED!'),
  INTERNAL_ERROR: new OrderResponse(500, 'SOMETHING WENT WRONG!'),
  ORDER_EXIST_ERROR: new OrderResponse(
    406,
    'An order already exists within 3 hours. Cannot create/update the order.',
  ),
};
