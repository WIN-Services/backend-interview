import request from "supertest";

import server from "../../server";
import { ResponseData } from "../../constant/Response";
import { serviceTest } from "./constant/serviceData";
import serviceModel from "../../src/service/service.model";

describe("post service", () => {
  it("post service successfully", async () => {
    const data = await serviceModel.find();
    await serviceModel.findByIdAndDelete(data[0]._id);
    const res = await request(server).post(`/api/v1/service`).send(serviceTest);
    expect(res.status).toEqual(201);
    expect(res.body.status).toEqual(true);
    expect(res.body.message).toEqual(ResponseData.addService);
  });

  it("post 2 service successfully", async () => {
    const res = await request(server).post(`/api/v1/service`).send(serviceTest);
    expect(res.status).toEqual(500);
    expect(res.body.status).toEqual(false);
    expect(res.body.message).toEqual(
      "user only add order within 3 hrs of a pre-existing order"
    );
  });
});

describe("put service", () => {
  it("put service successfully", async () => {
    const data = await serviceModel.find();
    const res = await request(server)
      .put(`/api/v1/service/${data[0]._id}`)
      .send(serviceTest);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual(true);
    expect(res.body.message).toEqual(ResponseData.updateService);
  });
});

describe("get service", () => {
  it("get service successfully", async () => {
    const res = await request(server).get(`/api/v1/service`);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual(true);
    expect(res.body.message).toEqual(ResponseData.getService);
  });
});

describe("delete service", () => {
  it("delete service successfully", async () => {
    const data = await serviceModel.find();
    const res = await request(server)
      .delete(`/api/v1/service/${data[0]._id}`)
      .send(serviceTest);
    expect(res.status).toEqual(200);
    expect(res.body.status).toEqual(true);
    expect(res.body.message).toEqual(ResponseData.deleteService);
  });
});
