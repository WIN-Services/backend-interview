export interface OrderResponseInterface {
  services: Services[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  orderId: string;
}
export interface Services {
  id: string;
}
