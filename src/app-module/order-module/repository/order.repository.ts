import { Connection, EntityRepository, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private db: Connection) {
    super();
  }
  public async saveOrder(body: OrderEntity): Promise<OrderEntity> {
    return this.save(body);
  }
  public async findByPagination(
    skip: number,
    limit: number,
    condition: any,
  ): Promise<any> {
    const result = await this.find({
      where: {
        ...condition,
        isDeleted: false,
      },
      order: { createdAt: -1 },
      skip: skip,
      take: limit,
    });
    // .sort({ createdAt: -1 })
    // .exec();
    console.log('result', result);
    const orderArray = [];
    result.map((data) => {
      orderArray.push({
        services: data.services,
        userId: data.userId,
        orderId: JSON.parse(JSON.stringify(data.id)),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });
    return orderArray;
  }
  public async updateOrder(
    body: Partial<OrderEntity>,
    orderId: string,
  ): Promise<any> {
    const data = await this.update(
      { id: orderId },
      {
        services: body.services,
      },
    );
    return data;
  }
  public async deleteOrder(orderId: string): Promise<any> {
    const data = await this.update(
      { id: orderId },
      {
        isDeleted: true,
      },
    );
    return data;
  }
  public async findByUserId(userId: string) {
    const data = await this.findOne({
      where: {
        isDeleted: false,
        userId: userId,
      },
    });

    return data;
  }
}
