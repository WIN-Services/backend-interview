export interface IService {
  id?: string;
  name: string;
}

export interface IOrder {
  id?: string;
  dateTime: Date;
  totalFee: number;
  services: IService[];
}

export class OrderResponse {
  constructor(
    public statusCode: number,
    public message: string,
  ) {}
}
