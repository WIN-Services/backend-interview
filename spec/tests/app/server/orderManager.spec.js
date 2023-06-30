const _ = require("lodash");
const sinon = require("sinon");
const chai = require("chai");
const request = require("../../../utils/server")();
const basePath = "authentication";
const { v4: uuidv4 } = require("uuid");
const { ServiceModel } = require("./../../../../db/models/services");

const { OrderModel } = require("./../../../../db/models/orders");
describe(`trigger creation => /v1.0/${basePath}`, function () {
  let serviceModelStub;
  let orderDetailsStub;
  beforeEach(() => {
    
    serviceModelStub = sinon.stub(ServiceModel, "aggregate").returns([]);
    orderDetailsStub = sinon.stub(OrderModel, "aggregate").returns([]);
  });
  afterEach(() => {
    serviceModelStub.restore();
    orderDetailsStub.restore();
  });

  it("should create order", async () => {
    const saveStub = sinon.stub(OrderModel.prototype, 'save').resolves(6);

    const register_url = `/service/panel/orderService/v1.0/orders/createOrder`;
    res = await request.post(register_url).send({
      services: ["inspection"],
      user: 8,
      amount: 500,
    });
    chai.expect(res.statusCode).to.be.equal(200);
    saveStub.restore()
   
  });
});
