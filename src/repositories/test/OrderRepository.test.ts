import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import 'reflect-metadata';
import * as TypeMoq from 'typemoq';
import { IDatabaseConnection } from '../../database/instances/DatabaseConnection.interface';
import { OrderManagementRepository } from '../OrderManagementRepository';
import { WinstonLogger } from '../../common/logging/WinstonLogger';
import { IOrderDatastore } from '../../database/datastores/OrderDatastore.interface';
import { ILocalizeService } from '../../instances/others/LocalizeService.interface';
import { IRequestOrderParams } from '../../server/controllers/orderManagementController/RequestOrderMiddleware';
import { Order } from '../../database/entities/Order';
import { Service } from '../../database/entities/Service';

chai.use(chaiAsPromised);
describe('order test cases', () => {
  let database: TypeMoq.IMock<IDatabaseConnection> | undefined;
  let orderDatastore: TypeMoq.IMock<IOrderDatastore>;
  let localizeService: TypeMoq.IMock<ILocalizeService> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let orderRepository: OrderManagementRepository;

  beforeEach(() => {
    process.env.locale = 'en';
    process.env.device = 'ios';

    orderDatastore = TypeMoq.Mock.ofType<IOrderDatastore>();
    database = TypeMoq.Mock.ofType<IDatabaseConnection>();
    localizeService = TypeMoq.Mock.ofType<ILocalizeService>();
    orderRepository = new OrderManagementRepository(
      new WinstonLogger(),
      localizeService.object,
      database.object,
      orderDatastore.object
    );
  });

  it('The save order should be success', async () => {

    const order:IRequestOrderParams = {
      description: 'test',
      services: ['1','2'],
      totalFee: 100,
      userId: '1'
    }

    const service1Database: Service = new Service();
    service1Database.id = '1';

    const service2Database: Service = new Service();
    service2Database.id = '2';

    const orderDatabase : Order = new Order();
    orderDatabase.id = 'test';
    orderDatabase.description = 'test';
    orderDatabase.totalFee = 100;
    orderDatabase.services = [service1Database, service2Database];

    await orderDatastore
    .setup(mock => mock.saveOrder(orderDatabase, undefined))
    .returns(() => Promise.resolve<Order>(orderDatabase));

    const orderResponse = await orderRepository.save(order);

    chai.expect(orderResponse).eq(undefined);
  });

  it('The order should be be failed', async () => {

    const order:IRequestOrderParams = {
      description: 'test',
      services: ['1','3'],
      totalFee: 100,
      userId: '1'
    }

    const service1Database: Service = new Service();
    service1Database.id = '1';

    const service2Database: Service = new Service();
    service2Database.id = '2';

    const orderDatabase : Order = new Order();
    orderDatabase.id = 'tes';
    orderDatabase.description = 'test';
    orderDatabase.totalFee = 100;
    orderDatabase.services = [service1Database, service2Database];

    await orderDatastore
    .setup(mock => mock.saveOrder(orderDatabase, undefined))
    .returns(() => Promise.resolve<Order>(orderDatabase));

    const orderResponse = await orderRepository?.save(order);

    chai.expect(orderResponse).eq(undefined);
  });
});
