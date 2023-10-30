const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;

chai.use(chaiHttp);

const { connectDB, Order, Service } = require("../src/controllers/setupDB");

async function setupTestData() {
    const orders = [
        {
            id: "223",
            datetime: "2022-11-01T11:11:11.111Z",
            totalfee: 100,
            services: [
                {
                    id: "123",
                },
            ],
        },
        {
            id: "224",
            datetime: "2022-11-01T11:11:11.111Z",
            totalfee: 100,
            services: [
                {
                    id: "789",
                },
            ],
        },
        {
            id: "225",
            datetime: "2022-11-01T11:11:11.111Z",
            totalfee: 100,
            services: [
                {
                    id: "456",
                },
            ],
        },
    ];

    await Order.insertMany(orders);
}

describe("order management API Endpoints Testing", async function () {
    before(async function () {
        await connectDB();
        await Service.deleteMany({});
        await Order.deleteMany({});
        await setupTestData();
    });
    describe("fetch all order details endpoint", () => {
        it("should get all order details", (done) => {
            chai.request(app)
                .get("/orders")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.totalNumberOfOrders).to.equal(3);
                    expect(res.body.orders).to.be.an("array");
                    done();
                });
        });

        it("should return 404 for non-existing endpoint", (done) => {
            chai.request(app)
                .get("/orders/nonexistent")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
    describe("fetch order details endpoint", () => {
        it("should get order details by ID", (done) => {
            const orderId = "223";
            chai.request(app)
                .get(`/orders/${orderId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.order.id).to.equal(orderId);
                    done();
                });
        });

        it("should return 404 for non-existing order ID", (done) => {
            const orderId = "999";

            chai.request(app)
                .get(`/orders/${orderId}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});
