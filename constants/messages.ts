export const MESSAGES = {
  ORDERS: {
    CREATE: {
      SUCCESS: "Order created succesfully",
      FAIL: "Order creation failed",
      ALREADY_EXISTS: "Order already placed with requested service.",
    },
    UPDATE: {
      SUCCESS: "Order updated",
      FAIL: "order updation failed",
      NOT_ALLOWED: "Not allowed to update.",
    },
    FETCH: {
      SUCCESS: "Orders fetched ",
      FAIL: "Failed to fetch orders",
    },
    DELETE: {
      SUCCESS: "Order deleted succesfully",
      FAIL: "Failed to remove order",
    },
  },
  SERVICES: {
    CREATE: {
      SUCCESS: "Service created",
      FAIL: "Failed to create service",
      ALREADY_EXISTS: "Service already exists",
    },
    FETCH: {
      SUCCESS: "Services fetched",
      FAIL: "Failed to fetch services",
    },
    INVALID_SERVICE: "Invalid service requested",
  },
};
