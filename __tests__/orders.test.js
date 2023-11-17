const request = require('supertest')
const app = require('../server')


describe('order Endpoints', () => {
  it('should fetch all the orders', async () => {
    const res = await request(app)
      .get('/orders')
      .send([{
        "_id": "6555de024e6dd6c193378dda",
        "id": "789",
        "totalfee": 500,
        "services": [
          {
            "id": "123"
          }
        ],
        "datetime": "2023-11-16T09:16:50.046Z",
        "createdAt": "2023-11-16T04:16:50.046Z",
        "updatedAt": "2023-11-16T09:36:04.820Z",
        "__v": 0
      }])
    expect(res.statusCode).toEqual(200)
  })
})







