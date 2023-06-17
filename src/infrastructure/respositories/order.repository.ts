import { injectable } from "inversify";
import { BaseRepository, IBaseRepository } from "../../shared/repositories/base.repository";
import { ENTITY, IOrder, IOrderModel } from "../../models/order.model";
import { Optional } from "sequelize";
import { NullishPropertiesOf } from "sequelize/types/utils";


export interface IOrderRepository extends IBaseRepository<IOrderModel> {
    create(model: IOrder): Promise<IOrder>;
    get(orderId: number): Promise<IOrderModel>;
    findAll(): Promise<IOrder[]>;
    updateOrder(orderId: number, dataToUpdate: Partial<IOrder>): Promise<number>;
    delete(orderId: number): Promise<number>;
}

@injectable()
export class OrderRepository extends BaseRepository<IOrderModel> implements IOrderRepository {
    constructor() {
        super(ENTITY);
    }

    public create(model: IOrder): Promise<IOrder> {
        return this.save(model);
    }

    public async get(orderId: number): Promise<IOrderModel> {
        const [order] = await this.list({
            where: {
                id: orderId
            },
            include: [
                {
                    model: this.models.OrderService,
                    as: "orderServices"
                }
            ]
        });
        return order;
    }

    public async findAll(): Promise<IOrder[]> {
        // Note sort and pagination and search can be added based on use case
        return this.list({
            // We can exclude OrderService in list and get in details section only
            include: [
                {
                    model: this.models.OrderService,
                    as: "orderServices"
                }
            ]
        });
    }

    public updateOrder(orderId: number, dataToUpdate: Partial<IOrder>): Promise<number> {
        return this.update(dataToUpdate as Optional<IOrderModel, NullishPropertiesOf<IOrderModel>>, { where: { id: orderId } });
    }

    public delete(orderId: number): Promise<number> {
        return this.del({ id: orderId });
    }

}
