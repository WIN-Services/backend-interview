import { Connection, EntityRepository, Repository } from 'typeorm';
import { ServicesEntity } from '../entities/services.entity';

@EntityRepository(ServicesEntity)
export class ServicesRepository extends Repository<ServicesEntity> {
  constructor(private db: Connection) {
    super();
  }
  public async saveService(body: ServicesEntity): Promise<any> {
    return this.save(body);
  }
  public async findByPagination(skip: number, limit: number): Promise<any> {
    const result = await this.find({
      where: {
        isDeleted: false,
      },
      order: { createdAt: -1 },
      take: limit,
      skip: skip,
    });
    console.log('result', result);
    const servicesArray = [];
    result.map((data) => {
      servicesArray.push({
        name: data.name,
        description: data.description,
        fee: data.fee,
        serviceId: JSON.parse(JSON.stringify(data.id)),
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      });
    });
    return servicesArray;
  }
  public async updateService(
    body: Partial<ServicesEntity>,
    orderId: string,
  ): Promise<any> {
    const data = await this.update(
      { id: orderId },
      {
        name: body.name,
        description: body.description,
        fee: body.fee,
      },
    );
    return data;
  }
  public async deleteService(serviceId: string): Promise<any> {
    const data = await this.update(
      { id: serviceId },
      {
        isDeleted: true,
      },
    );
    return data;
  }
}
