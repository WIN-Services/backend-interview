const orderController = require("../server/orders/controller");

const mockRequest = () => {
  const req = {};
  req.params = jest.fn().mockReturnValue(req);
  req.body = jest.fn().mockReturnValue(req);
  return req;
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("orderController", () => {
  describe("getAllOrders", () => {
    test("should return all orders", async () => {
      const req = mockRequest();
      const res = mockResponse();

      orderController.getAllOrders = jest
        .fn()
        .mockResolvedValue(["order1", "order2"]);

      const res1 = await orderController.getAllOrders(req, res);
      console.log(res1);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
