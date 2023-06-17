import { IDBConnection } from "../shared/services/base.type.injectable";
import { OrderClass } from "./order.model";
import { OrderServiceClass } from "./order.service.model";
import { ServiceClass } from "./service.model";

export class OrderModel {
    private readonly orderClass: OrderClass;
    private readonly serviceClass: ServiceClass;
    private readonly orderServiceClass: OrderServiceClass;

    constructor(private connection: IDBConnection) {
        const { DefaultModelOptions } = connection;
        this.orderClass = new OrderClass(connection, { defaultModelOptions: DefaultModelOptions });
        this.serviceClass = new ServiceClass(connection, { defaultModelOptions: DefaultModelOptions });
        this.orderServiceClass = new OrderServiceClass(connection, { defaultModelOptions: DefaultModelOptions });
    }

    public initRelations() {
        const models = this.connection.models;

        const orderClassModel = this.orderClass.getModel();
        orderClassModel.hasMany(models.OrderService, { foreignKey: "orderId", as: "orderServices" });

        const serviceClassModel = this.serviceClass.getModel();
        serviceClassModel.belongsTo(models.OrderService, { foreignKey: "serviceId" });
    }
}
