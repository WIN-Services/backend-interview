const request = require('supertest');
const router = require("../routes/route.js");
const app = require("../server")
const {
    orders
  } = require('../model/model')


describe('Get order by id test', () => {
    it('testing /order/id endpoint', async() => {
        // specifying fieldname which we want to compare later
        const fieldName = 'orderid';

        // getting the stored document which we want to match with the response received
        const storedDocument = await orders.find({ orderid: 2 }).lean();

        // line 17-24 converting stored document such that data type can match with the response received
        const timestamp = storedDocument[0].datetime
        const dateObj = new Date(timestamp);
        const dateString = dateObj.toISOString();
        storedDocument[0].datetime = dateString;
        let idString = storedDocument[0]._id
        idString = idString.toString();
        storedDocument[0]._id = idString
        console.log('stored is',storedDocument)

        // getting the response from api request
        const response = await request(app).get("/api/order/2");
        console.log('response is',response.body)
        

        expect(response.statusCode).toBe(200);
        expect({ [fieldName]: response.body[0][fieldName] }).toEqual({ [fieldName]: storedDocument[0][fieldName] });
        expect(response.body).toEqual(storedDocument);
    });
})


describe('Get all orders test', () => {
    it('testing /orders endpoint', async() => {

        const storedDocument = await orders.find({}).lean();

        const response = await request(app).get("/api/orders");
        console.log('response is',response.body)

        expect(response.statusCode).toBe(200);

    });
})


