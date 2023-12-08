const chai = require('chai')
const chaiHttp = require('chai-http')
const mongoose = require('mongoose')
const app = require('../src/index') 

const Order = require('../src/models/Order')
const ServiceRecord = require('../src/models/ServiceRecord') 

chai.use(chaiHttp)
const expect = chai.expect

describe('Order Controller', () => {
  let serviceId1, serviceId2

  beforeEach(async () => {
    await Order.deleteMany()
    await ServiceRecord.deleteMany()

    const service1 = await ServiceRecord.create({ name: 'Service 1' })
    const service2 = await ServiceRecord.create({ name: 'Service 2' })

    serviceId1 = service1._id
    serviceId2 = service2._id
  })

  it('should create a new order', async () => {
    const orderData = {
      services: [serviceId1], // Use the actual service ID
      totalfee: 150,
    }

    const res = await chai.request(app).post('/api/orders').send(orderData)

    expect(res).to.have.status(201)
    expect(res.body).to.have.property('services').that.is.an('array').with.lengthOf(1)
    expect(res.body.services[0].toString()).to.equal(serviceId1.toString()) 
    expect(res.body).to.have.property('totalfee', 150)
  })
  it('should get all orders', async () => {
    const res = await chai.request(app).get('/api/orders')
  
    expect(res).to.have.status(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf(0) 
  })
  
})

