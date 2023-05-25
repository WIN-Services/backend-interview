import OrderService from "./OrderService.js";
import TestDBFunction from "../Utility/Test/testDB.js";

describe("Test_OrderService", () => {
  function setupTest(lastCreated, DBResponses = {}) {
    const central = {
      lastCreated: lastCreated,
      DBs: {
        commonDB: new TestDBFunction({
          collection: function (_collection) {
            return {
              find: function () {
                return {
                  toArray: function () {
                    return DBResponses.toArrayResponse || [];
                  },
                };
              },
              findOne: function (_query) {
                return DBResponses.findOneResponse || null;
              },
              insertOne: function (_query) {
                return DBResponses.insertOneResponse || null;
              },
              updateOne: function (_query, _options) {
                return DBResponses.updateOneResponse || {};
              },
              deleteOne: function (_query, _options) {
                return DBResponses.deleteOneResponse || {};
              },
            };
          },
        }),
      },
    };
    return central;
  }

  describe("Test_createOrder", () => {
    test("Successfully created at first attempt", async () => {
      const orderService = new OrderService(setupTest());

      const res = await orderService.createOrder({
        id: "123",
        datetime: "2022-11-01T11:11:11.111Z",
        totalfee: 100,
        services: [
          {
            id: "123",
          },
        ],
      });
      expect(res.status).toBe(201);
    });

    test("Should fail at second attempt due to 3 hour bracket not achieved", async () => {
      const orderService = new OrderService(setupTest());

      await orderService.createOrder({
        id: "123",
        datetime: "2022-11-01T11:11:11.111Z",
        totalfee: 100,
        services: [
          {
            id: "123",
          },
        ],
      });

      const res = await orderService.createOrder({
        id: "1234",
        datetime: "2022-11-01T11:11:11.111Z",
        totalfee: 100,
        services: [
          {
            id: "123",
          },
        ],
      });

      expect(res.status).toBe(400);
    });
  });

  describe("Test_updateOrder", () => {
    test("Successfully update at first attempt", async () => {
      const orderService = new OrderService(
        setupTest(0, {
          updateOneResponse: {
            modifiedCount: 1,
          },
        })
      );

      const res = await orderService.updateOrder("123", {
        id: "123",
        datetime: "2022-11-01T11:11:11.111Z",
        totalfee: 1001,
        services: [
          {
            id: "123",
          },
        ],
      });
      expect(res.status).toBe(200);
    });

    test("Should fail at second attempt due to 3 hour bracket not achieved", async () => {
      const orderService = new OrderService(
        setupTest(0, {
          updateOneResponse: {
            modifiedCount: 0,
          },
        })
      );

      const res = await orderService.updateOrder("123", {
        id: "1234",
        datetime: "2022-11-01T11:11:11.111Z",
        totalfee: 1002,
        services: [
          {
            id: "123",
          },
        ],
      });

      expect(res.status).toBe(400);
    });
  });

  describe("Test_getOrder", () => {
    test("Successfully Get", async () => {
      const orderService = new OrderService(
        setupTest(0, {
          findOneResponse: {
            id: "1234",
            datetime: "2022-11-01T11:11:11.111Z",
            totalfee: 100,
            services: [
              {
                id: "123",
              },
            ],
          },
        })
      );

      const res = await orderService.getOrder("123");
      expect(res.status).toBe(200);
    });

    test("Should return 404 when no record found", async () => {
      const orderService = new OrderService(
        setupTest(0, {
          findOneResponse: null,
        })
      );

      const res = await orderService.getOrder("123");
      expect(res.status).toBe(404);
    });
  });

  describe("Test_getOrders", () => {
    test("Successfully Get", async () => {
      const orderService = new OrderService(
        setupTest(0, {
          toArrayResponse: [
            {
              id: "1234",
              datetime: "2022-11-01T11:11:11.111Z",
              totalfee: 100,
              services: [
                {
                  id: "123",
                },
              ],
            },
          ],
        })
      );

      const res = await orderService.getOrders();
      expect(res.status).toBe(200);
    });

    test("Should return 404 when no record found", async () => {
      const orderService = new OrderService(
        setupTest(0, {
          toArrayResponse: [],
        })
      );

      const res = await orderService.getOrders();
      expect(res.status).toBe(404);
    });
  });

  describe("Test_deleteOrder", () => {
    test("Successfully Delete", async () => {
      const orderService = new OrderService(
        setupTest(0, {
          deleteOneResponse: {
            delete_count: 1,
          },
        })
      );

      const res = await orderService.deleteOrder("123");
      expect(res.status).toBe(200);
    });

    test("Should return 404 when no record found", async () => {
      const orderService = new OrderService(
        setupTest(0, {
          deleteOneResponse: {
            delete_count: 0,
          },
        })
      );

      const res = await orderService.getOrder("123");
      expect(res.status).toBe(404);
    });
  });
});
