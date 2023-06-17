import { DataTypes, Sequelize, ModelOptions, ModelDefined, Optional, Model } from "sequelize";
import { IBaseModel } from "../shared/repositories/base.repository";

// NOTE creating model in functional way
export const ENTITY = "Service";

export interface IService extends IBaseModel {
    name: string;
}

type ServiceCreationAttributes = Optional<IService, 'id'>;

export interface IServiceModel extends Model, IService {
    dataValues: IService;
}

export class ServiceClass {
    private service: ModelDefined<IService, ServiceCreationAttributes>;

    public getModel(): ModelDefined<IService, ServiceCreationAttributes> {
        if (!this.service) {
            throw new Error(`Model ${ENTITY} is not yet initialized`);
        }
        return this.service;
    }

    constructor(private connection: Sequelize, private options: { defaultModelOptions: ModelOptions }) {
        this.service = this.connection.define<Model<IService, ServiceCreationAttributes>>(
            ENTITY,
            {
                id: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: new DataTypes.STRING(64),
                    allowNull: false
                }
            },
            {
                ...this.options.defaultModelOptions
            }
        );

    }
}