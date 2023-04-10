import request from "supertest";
import app from "../routes/index.js";
import { TEST_CASES } from "./constant.js";

describe(TEST_CASES.order.describe, function () {
  it(TEST_CASES.order.getAllOrders, function (done) {
    request(app).get("/orders").expect(200, done);
  });
});
