import { expect } from "chai";
import { describe, it, before, after } from "mocha";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import {
  getAllOrders,
  getSingleOrder,
  createNewOrder,
  updateOrder,
  deleteOrder,
} from "../controller/index.controller";
import { seed } from "../seed";

const prisma = new PrismaClient();

async function clearDatabase() {
  await prisma.orders.deleteMany();
  await prisma.service.deleteMany();
}

describe("Orders API", () => {
  before(async () => {
    await clearDatabase();
    await seed();
  });

  after(async () => {
    await clearDatabase();
    await prisma.$disconnect();
  });

  describe("getAllOrders", () => {
    it("should return all orders", async () => {
      const req = {} as Request;
      const res = {
        status: (code: number) => res,
        json: (data: any) => data,
      } as Response;

      const result = await getAllOrders(req, res);
      expect(result).to.have.property("Orders");
      expect(result).to.have.property("Orders").to.be.an("array");
      expect(result)
        .to.have.property("Orders")
        .to.be.an("array")
        .to.have.length(3);
    });
  });

  describe("getSingleOrder", () => {
    it("should return a single order", async () => {
      const req = {} as Request;
      const res = {
        status: (code: number) => res,
        json: (data: any) => data,
      } as Response;
      req.params = { orderId: "223" };
      const result = await getSingleOrder(req, res);
      expect(result).to.have.property("order");
      expect(result).to.have.property("order").to.be.an("object");
      expect(result)
        .to.have.property("order")
        .to.be.an("object")
        .to.have.property("id");
        expect(result)
        .to.have.property("order")
        .to.be.an("object")
        .to.have.property("totalfee");
    });
  });

  describe("createNewOrder", () => {
    it("should create a new order", async () => {
      const req = {
        body: {
          totalfee: 100,
          services: [{ id: 123 }],
        },
      } as Request;
      const res = {
        status: (code: number) => res,
        json: (data: any) => data,
      } as Response;

      const result = await createNewOrder(req, res);
      expect(result).to.have.property("message").to.equal("Order Placed");
    });
  });

  describe("updateOrder", () => {
    it("should update an order", async () => {
      const req = {} as Request;
      const res = {
        status: (code: number) => res,
        json: (data: any) => data,
      } as Response;
      req.params = { orderId: "223" };
      req.body = {
        totalfee: 200,
        services: [{ id: 789 }],
      };
      const result = await updateOrder(req, res);
      expect(result).to.have.property("message").to.equal("Order updated");
    });
  });

  describe("deleteOrder", () => {
    it("should delete an order", async () => {
      const req = {} as Request;
      const res = {
        status: (code: number) => res,
        json: (data: any) => data,
      } as Response;
      req.params = { orderId: "223" };

      const result = await deleteOrder(req, res);
      expect(result).to.have.property("message").to.equal("Order deleted");
    });
  });
});
