const request = require('supertest')
const app = require('../server')


describe('order Endpoints', () => {
  it('should create a new order', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        "id":"52163821333",
        "totalfee": 120,
        "services":["655521b2ed8198439859f24c"]
    })
    expect(res.statusCode).toEqual(201)
  })
})