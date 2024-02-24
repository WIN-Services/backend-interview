export interface CreateOrderSchema {
  totalFee: number;
  services: number[];
}

export interface UpdateOrderSchema {
  totalFee?: number;
  services?: number[];
}
