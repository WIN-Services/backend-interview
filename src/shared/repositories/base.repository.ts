import "reflect-metadata";
import { injectable, unmanaged as _unmanaged } from "inversify";
import { BaseImplementationType, BaseTypeMeta, IDBConnection } from "../services/base.type.injectable";

import { Model, FindOptions, FindAndCountOptions, UpdateOptions, WhereOptions, ModelStatic, CreationOptional, InferAttributes, InferCreationAttributes, BulkCreateOptions } from "sequelize";
import { DatabaseError } from "../errors/database.error";
import { MakeNullishOptional } from "sequelize/types/utils";
import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";


// TODO: Remove after https://github.com/inversify/InversifyJS/issues/1505 is resolved
export const unmanaged = _unmanaged as () => (target: DecoratorTarget, targetKey: string | undefined, index: number) => void;


export interface IBaseRepository<T extends Model<InferAttributes<T>>> {
    save(data: MakeNullishOptional<InferCreationAttributes<T>> & Partial<IBaseModel>, handleUpsert?: boolean): Promise<T>
    list<K = T>(dataAccessCondition: FindOptions): Promise<K[]>;
    listAndCountAll(dataAccessCondition: FindAndCountOptions): Promise<{ rows: T[]; count: number; }>;
    update(data: MakeNullishOptional<T | IBaseModel>, updateCondition: UpdateOptions<InferAttributes<T, { omit: never; }>>): Promise<number>;
    del(dataAccessCondition: WhereOptions): Promise<number>;
    insertMany(
        data: (MakeNullishOptional<InferCreationAttributes<T>> & Partial<IBaseModel>)[],
        options?: BulkCreateOptions<InferAttributes<T, { omit: never; }>>
    ): Promise<T[]>;

}

export interface IBaseModel {
    id: CreationOptional<number>;
}

@injectable()
export abstract class BaseRepository<T extends Model<InferAttributes<T>>>
    extends BaseTypeMeta
    implements IBaseRepository<T> {

        private dbModels: { [key: string]:ModelStatic<Model<InferAttributes<T>, InferCreationAttributes<T>>> } | undefined;
        protected get models(): { [key: string]:ModelStatic<Model<InferAttributes<T>, InferCreationAttributes<T>>> } {
            if (!this.dbModels) {
                throw new DatabaseError(DatabaseError.CONNECTION_STRING_NOT_FOUND);
            }
            return this.dbModels;
        }


    protected dbModel: ModelStatic<Model<InferAttributes<T>, InferCreationAttributes<T>>> | undefined;

    protected get model(): ModelStatic<Model<InferAttributes<T>, InferCreationAttributes<T>>> {
        if (!this.dbModel) {
            throw new DatabaseError(DatabaseError.CONNECTION_STRING_NOT_FOUND);
        }
        return this.dbModel;
    }

    protected OnDBConnection = () => {
        if (!this.dbConn) {
            throw new DatabaseError(DatabaseError.CONNECTION_STRING_NOT_FOUND);
        }
        this.dbModels = (this.dbConn as IDBConnection).models;
        this.dbModel = (this.dbConn as IDBConnection).models[this.modelKey];
    }

    constructor(
        @unmanaged() private modelKey: string) {
        super(BaseImplementationType.Repository);
    }
    public async save(data: MakeNullishOptional<InferCreationAttributes<T>> & Partial<IBaseModel>, handleUpsert?: boolean): Promise<T> {
        if (!this.transactionOption) {
            throw new Error("Falsy values are invalid for tranasction options");
        }
        const hasIdentifierNotSet = (data.id == null || data.id < 1)
        if ((handleUpsert == null || handleUpsert === false) && hasIdentifierNotSet) {
            const savedObject: Model<any, any> = await this.model.create(data, this.transactionOption);
            const dataToReturn = savedObject.get({ plain: true }) as T;
            return dataToReturn;
        }
        const [upsertedData] = await this.model.upsert(data, this.transactionOption);
        return upsertedData.get({ plain: true }) as T;
    }

    public insertMany(
        data: (MakeNullishOptional<InferCreationAttributes<T>> & Partial<IBaseModel>)[],
        options?: BulkCreateOptions<InferAttributes<T, { omit: never; }>>
    ): Promise<T[]> {
        if (!this.transactionOption) {
            throw new Error("Falsy values are invalid for tranasction options");
        }
        return this.model.bulkCreate(data, { ...this.transactionOption, ...options }) as unknown as Promise<T[]>;
    }

    public list<K = T>(dataAccessCondition: FindOptions<InferAttributes<T, {
        omit: never;
    }>> | undefined): Promise<K[]> {
        const options = { ...dataAccessCondition, ...this.transactionOption };
        return this.model.findAll(options) as unknown as Promise<K[]>;
    }

    public listAndCountAll(dataAccessCondition: FindAndCountOptions): Promise<{ rows: T[]; count: number }> {
        const options = { ...dataAccessCondition, ...this.transactionOption };
        return this.model.findAndCountAll(options) as unknown as Promise<{ rows: T[]; count: number }>;
    }


    public update(data: MakeNullishOptional<T | IBaseModel>, updateCondition: UpdateOptions<InferAttributes<T, { omit: never; }>>): Promise<number> {
        return this.model.update(data, { ...updateCondition, ...this.transactionOption })
            .then(([affectedCount,]) => affectedCount);
    }

    public del(dataAccessCondition: WhereOptions): Promise<number> {
        return this.model.destroy({ where: dataAccessCondition, ...this.transactionOption });
    }
}
