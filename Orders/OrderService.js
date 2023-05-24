import { v4 } from "uuid";

export default class OrderService {
  constructor(central) {
    this.central = central;
    this.commonDB = central.DBs["commonDB"];
  }

  async createOrder(orderData) {
    try {
      if (Date.now() - this.central.lastCreated <= 10800000) {
        return {
          status: 400,
          error: "Order already created in last 3 hours",
        };
      }
      const orderID = v4();
      orderData["created_at"] = Date.now();
      orderData["updated_at"] = orderData["created_at"] - 10800000;
      await this.commonDB.DBQuery("order", "insertOne", {
        ...orderData,
        unique_id: orderID,
      });
      this.central.lastCreated = orderData["created_at"];
      return {
        status: 201,
        message: `Order successfully created with ID ${orderID}`,
      };
    } catch (error) {
      return {
        status: 500,
        error: error.message,
      };
    }
  }

  async updateOrder(orderID, orderData) {
    try {
      const currentTime = Date.now();
      console.log("Current time is", currentTime);
      const response = await this.commonDB.DBQuery(
        "order",
        "updateOne",
        {
          order_id: orderID,
          updated_at: { $lt: currentTime - 10800000 },
        },
        {
          ...orderData,
          updated_at: currentTime,
        }
      );
      if (response.modifiedCount === 1) {
        return {
          status: 200,
          message: response,
        };
      } else {
        return {
          status: 400,
          error: "Order updated within last 3 hours",
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: error.message,
      };
    }
  }

  async getOrder(orderID) {
    try {
      const response = await this.commonDB.DBQuery("order", "findOne", {
        order_id: orderID,
      });
      if (response !== null) {
        return {
          status: 200,
          message: response,
        };
      } else {
        return {
          status: 404,
          error: `Order with order_id ${orderID} doesn't exist`,
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: error.message,
      };
    }
  }

  async getOrders() {
    try {
      const response = await this.commonDB.DBQuery("order", "find", {});
      console.log("!!!!!!!! response at 103 is", response);
      console.log("!== check gave", response !== []);
      if (response.length > 0) {
        return {
          status: 200,
          message: response,
        };
      } else {
        return {
          status: 404,
          message: "There are no orders to display",
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: error.message,
      };
    }
  }

  async deleteOrder(orderID) {
    try {
      const response = await this.commonDB.DBQuery("order", "delete", {
        order_id: orderID,
      });
      if (response.delete_count === 1) {
        return {
          status: 200,
          message: "Order Successfully deleted",
        };
      } else {
        return {
          status: 404,
          error: `Order with order_id ${orderID} doesn't exist`,
        };
      }
    } catch (error) {
      return {
        status: 500,
        error: error.message,
      };
    }
  }
}
