const request = require("supertest");
const app = require("../server");
const { isValidOrder } = require("../services/OrderServices");

let isValid = false;
beforeAll(async () => {
    isValid = await isValidOrder()
  });

describe("Get all orders", () =>{
    it("should return 201", async ()=>{
        const {statusCode} = await request(app)
        .get('/order/getall')

        expect(statusCode).toBe(201);
    })
})

describe("Update an order", () => {
    
    it(`should return ${isValid ? 201 : 400}`, async ()=>{
        const {statusCode} = await request(app)
        .put('/order/update')
        .send({
            "id": "65a7accf9da9fdafd10b29b4",
            "totalfee": 121,
            "services": [
                {
                    "id": "65a79383711b17d3e5811dc1"
                }
            ]
        })

        expect(statusCode).toBe(isValid ? 201 : 400);

    })
})
describe("Create an order", () => {
    
    it(`should return ${isValid ? 201 : 400}`, async ()=>{
        const {statusCode} = await request(app)
        .put('/order/update')
        .send({
            "totalfee": 100,
            "services": [
                {
                "id": "65a79383711b17d3e5811dc6"
                }
            ]
          })

        expect(statusCode).toBe(isValid ? 201 : 400);

    })
})