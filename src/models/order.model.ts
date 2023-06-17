import { DataTypes, Sequelize, ModelOptions, ModelDefined, Optional, Model, NOW } from "sequelize";
import { IBaseModel } from "../shared/repositories/base.repository";
import { IOrderService } from "./order.service.model";

// NOTE creating model in functional way
export const ENTITY = "Order";

export interface IOrder extends IBaseModel {
    datetime: Date;
    totalfee: number;
    orderServices?: IOrderService[];
}

type OrderCreationAttributes = Optional<IOrder, 'id'>;

export interface IOrderModel extends Model, IOrder {
    dataValues: IOrder;
}

export class OrderClass {
    private order: ModelDefined<IOrder, OrderCreationAttributes>;

    public getModel(): ModelDefined<IOrder, OrderCreationAttributes> {
        if (!this.order) {
            throw new Error(`Model ${ENTITY} is not yet initialized`);
        }
        return this.order;
    }

    constructor(private connection: Sequelize, private options: { defaultModelOptions: ModelOptions }) {
        this.order = this.connection.define<Model<IOrder, OrderCreationAttributes>>(
            ENTITY,
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true
                },
                datetime: {
                    type: new DataTypes.DATE,
                    allowNull: false,
                    defaultValue: NOW
                },
                totalfee: {
                    type: new DataTypes.FLOAT,
                    allowNull: false
                }
            },
            {
                ...this.options.defaultModelOptions
            }
        );

    }
}