const { setupDatabase, dropDB, closeDB } = require('./utils/db');
const ServiceModule = require('../modules/Service');

beforeAll(async () => {
    await setupDatabase();
});

afterEach(async () => {
    await dropDB();
});

afterAll(async () => {
    await closeDB();
});
describe('Service test', () => {
    test('should insert a document into the collection', async () => {
        const data = { _id: 's_test', name: 'test' };

        await ServiceModule.create(data);

        const insertedDocument = await ServiceModule.get('s_test');
        expect(insertedDocument).toMatchObject(data);
    });
});

