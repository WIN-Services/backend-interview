export interface IService {
  id: number;
  name: string;
  fee: number;
}

export interface IOrders {
  id: number;
  totalfee: number;
  datetime: string;
  services: { id: number; name: string }[];
}
