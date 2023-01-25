const { getOrderById } = require('../services/services');


test('Get orders of id 113', async () => {
    expect (await getOrderById(113)).toMatchObject({
        success: true,
        data: expect.any(Array)
    });
})


test('Get all orders', async () => {
    expect (await getOrderById()).toMatchObject({
        success: true,
        data: expect.any(Array)
    });
})
