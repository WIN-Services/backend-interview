import { injectable } from "inversify";
import { BaseRepository, IBaseRepository } from "../../shared/repositories/base.repository";
import { ENTITY, IOrderService, IOrderServiceModel } from "../../models/order.service.model";


export interface IOrderServiceRepository extends IBaseRepository<IOrderServiceModel> {
    createMany(model: IOrderService[]): Promise<IOrderService[]>;
    delete(orderId: number): Promise<number>;
}

@injectable()
export class OrderServiceRepository extends BaseRepository<IOrderServiceModel> implements IOrderServiceRepository {

    constructor() {
        super(ENTITY);
    }

    public createMany(model: IOrderService[]): Promise<IOrderService[]> {
        return this.insertMany(model);
    }

    public delete(orderId: number): Promise<number> {
        return this.del({ orderId });
    }

}
