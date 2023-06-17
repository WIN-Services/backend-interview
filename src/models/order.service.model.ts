import { DataTypes, Sequelize, ModelOptions, ModelDefined, Optional, Model, NOW } from "sequelize";
import { IBaseModel } from "../shared/repositories/base.repository";

// NOTE creating model in functional way
export const ENTITY = "OrderService";

export interface IOrderService extends IBaseModel {
    orderId: number;
    serviceId: number;
}

type OrderServiceCreationAttributes = Optional<IOrderService, 'id'>;

export interface IOrderServiceModel extends Model, IOrderService {
    dataValues: IOrderService;
}

export class OrderServiceClass {
    private orderService: ModelDefined<IOrderService, OrderServiceCreationAttributes>;

    public getModel(): ModelDefined<IOrderService, OrderServiceCreationAttributes> {
        if (!this.orderService) {
            throw new Error(`Model ${ENTITY} is not yet initialized`);
        }
        return this.orderService;
    }

    constructor(private connection: Sequelize, private options: { defaultModelOptions: ModelOptions }) {
        this.orderService = this.connection.define<Model<IOrderService, OrderServiceCreationAttributes>>(
            ENTITY,
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true
                },
                orderId: {
                    type: new DataTypes.BIGINT,
                    allowNull: false,
                    references: { model: 'OrderService', key: 'id' },
                },
                serviceId: {
                    type: new DataTypes.BIGINT,
                    allowNull: false,
                    references: { model: 'Service', key: 'id' },
                }
            },
            {
                ...this.options.defaultModelOptions
            }
        );

    }
}