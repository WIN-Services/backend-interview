import { injectable, unmanaged as _unmanaged } from "inversify";
import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { Model, ModelOptions, ModelStatic, Sequelize, Transaction, TransactionOptions } from "sequelize";

// TODO: Remove after https://github.com/inversify/InversifyJS/issues/1505 is resolved
export const unmanaged = _unmanaged as () => (target: DecoratorTarget, targetKey: string | undefined, index: number) => void;

export interface ICustomTransactionModel {
    transaction: Transaction;
}

// Exteding Sequelize on custum DB model because these properties or ready-only in Sequelize 
export interface IDBConnection extends Sequelize {
    models: {
        [key: string]: ModelStatic<Model>;
    };
    DefaultModelOptions: ModelOptions;
    TransactionOption: TransactionOptions;
}

export enum BaseImplementationType {
    Validator = "Validator",
    Service = "service",
    Repository = "repository"
}

@injectable()
export class BaseTypeMeta {
    public artifactIdentifier: string;
    public transactionOption: ICustomTransactionModel | null;
    protected dbConn: IDBConnection | null;

    protected OnDBConnection: () => void = () => { };

    constructor(@unmanaged() identifier: string) {
        this.artifactIdentifier = identifier;
        this.transactionOption = null;
        this.dbConn = null;
    }

    public attachProperties(
        tx: ICustomTransactionModel | null,
        dbConnection: IDBConnection | null
    ) {
        this.transactionOption = tx;
        this.dbConn = dbConnection;
        const that = this as any;

        for (const property of Object.keys(that)) {
            const prop = that[property];
            if (!prop) { continue; }
            const isService = this.isService(prop);
            const isRepository = this.isRepository(prop);
            const isValidator = this.isValidator(prop);
            if (isService || isRepository || isValidator) {
                prop.attachProperties.apply(prop, arguments);
                if (isRepository) {
                    prop.OnDBConnection();
                }
            }
        }
    }

    private isService(property: any): boolean {
        if (typeof property !== "object") {
            return false;
        }
        return property.artifactIdentifier === BaseImplementationType.Service;
    }

    private isRepository(property: any): boolean {
        if (typeof property !== "object") {
            return false;
        }
        return property.artifactIdentifier === BaseImplementationType.Repository;
    }

    private isValidator(property: any): boolean {
        if (typeof property !== "object") {
            return false;
        }
        return property.artifactIdentifier === BaseImplementationType.Validator;
    }
}
