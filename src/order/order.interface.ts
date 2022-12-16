
export interface BaseOrder {
  services: number;
  total_fee: string;
  created_at: Date;
  updated_at: Date;
}

export interface Item extends BaseOrder {
  order_id: number;
}