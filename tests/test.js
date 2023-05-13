const request = require("supertest")
const baseURL = "http://localhost:3000"

const app = require("./../server")

// Can add more assrtions and improvements on the way

describe("GET /orders ", () => {
    test("It should respond with an array of orders and should have the status 200", async () => {
        const response = await request(app).get("/api/orders");
        expect(response.statusCode).toBe(200);
    });
});


describe("GET /order/<orderId> ", () => {
    test("It should respond with an array of order and should have the status 200", async () => {
        const response = await request(app).get("/api/order/101");
        expect(response.statusCode).toBe(200);
    });
});


describe("POST /order ", () => {
    let createdOrder = {}
    test("It should respond with a message and should have the status 200", async () => {
        const response = await request(app).post("/api/order").send({
            "services": [123, 456, 789],
          });;
        expect(response.statusCode).toBe(200);
        createdOrder = response.result
    });

    // Probably this can be mdified to a great extent
    test("It should respond with a gracefull error message and should have the status 403", async () => {
        const response = await request(app).put("/api/order").send({
            "services": [123],
            "orderId": 101
          });;
        expect(response.statusCode).toBe(403);
    });

    // Probably this can be mdified to a great extent
    test("It should respond with a gracefull error message and should have the status 403", async () => {
        const response = await request(app).delete("/api/order").send({
            "services": [123],
            "orderId": 101
          });;
        expect(response.statusCode).toBe(403);
    });
});

afterAll(done => {
    done()
})