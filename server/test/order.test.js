const { setupDatabase, dropDB, closeDB } = require('./utils/db');
const OrderModule = require('../modules/Order');
const ServiceModule = require('../modules/Service');
const ERRORS = require('../constants/error');

beforeAll(async () => {
    await setupDatabase();
});

afterEach(async () => {
    await dropDB();
});

afterAll(async () => {
    await closeDB();
});
describe('Order test', () => {
    test('Test creation/update constraint', async () => {
        await OrderModule.create({
            _id: 'o_test_1',
            totalFee: 200,
            services: ['s_test']
        });

        await ServiceModule.create({
            _id: 's_test',
            name: 'test'
        });
       try {
           await OrderModule.create({
               _id: 'o_test_2',
               totalFee: 200,
               services: ['s_test']
           });
       } catch (e) {
           expect(e.code).toBe(ERRORS.ORDER_RECENTLY_UPDATED.code);
       }
    });
    test('should insert a document into the collection', async () => {
        const data = { _id: 'o_test', totalFee: 400, services: [] };

        await OrderModule.create(data);

        const insertedDocument = await OrderModule.get('o_test');
        expect(insertedDocument).toMatchObject(data);
    });
});

