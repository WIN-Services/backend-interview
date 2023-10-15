const { expect } = require("chai").use(require("chai-json-schema"));
const supertest = require("supertest");
const sinon = require("sinon");
require("mocha-sinon");
const app = require("./../app.js");

let jwtTokenAdmin;
let jwtTokenUser;
let orderID;
const invalidOrderID = "652bc5fa50e8912345668923";
const emailAdmin = "testAdmin@win.com";
const emailUser = "testUser@win.com";

const orderSchema = {
    title: "orderSchema",
    type: "object",
    required: ["_id", "services", "totalFee", "createdAt", "updatedAt", "user"],
};

describe("Order create API", () => {
    before("Register user and generate jwtToken", async () => {
        const response = await supertest(app).post("/user/register").send({
            firstname: "testAdmin",
            lastname: "test",
            email: emailAdmin,
            password: "testpassword",
            gender: "male",
            dob: "02/12/2000",
            role: "Admin",
        });
        expect(response.status).to.equal(201);
        expect(response.text).to.equal("user registered successfully");

        const response1 = await supertest(app).post("/user/register").send({
            firstname: "testUser",
            lastname: "test",
            email: emailUser,
            password: "testpassword",
            gender: "male",
            dob: "02/12/2000",
        });
        expect(response1.status).to.equal(201);
        expect(response1.text).to.equal("user registered successfully");

        const response2 = await supertest(app).post("/user/login").send({
            email: emailAdmin,
            password: "testpassword",
        });
        expect(response2.status).to.equal(200);
        expect(response2.body).to.have.property("access_token");
        expect(response2.body).to.have.property("refresh_token");
        expect(response2.body).to.have.property("user");
        jwtTokenAdmin = response2.body.access_token;

        const response3 = await supertest(app).post("/user/login").send({
            email: emailUser,
            password: "testpassword",
        });
        expect(response3.status).to.equal(200);
        expect(response3.body).to.have.property("access_token");
        expect(response3.body).to.have.property("refresh_token");
        expect(response3.body).to.have.property("user");
        jwtTokenUser = response3.body.access_token;
    });

    it("should return unauthorized error", async () => {
        const response = await supertest(app)
            .post("/order/")
            .send({
                services: ["Testing", "Analysis"],
            });
        expect(response.status).to.equal(401);
        expect(response.text).to.equal("Unauthorized");
    });

    it("should create a order and return status 201 and a success message", async () => {
        const response = await supertest(app)
            .post("/order/")
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send({
                services: ["Testing", "Analysis"],
            });
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("_id");
        expect(response.body).to.have.property("services");
        expect(response.body).to.have.property("totalFee");
        expect(response.body).to.have.property("createdAt");
        expect(response.body).to.have.property("updatedAt");
        expect(response.body).to.have.property("user");
        orderID = response.body._id;
    });

    it("should return status 400 and a error message for invalid service", async () => {
        const response = await supertest(app)
            .post("/order/")
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send({
                services: ["Testing", "Analysis", "InvalidService"],
            });
        expect(response.status).to.equal(400);
        expect(response.text).to.equal(
            "Invalid Service ('InvalidService') provided!"
        );
    });

    it("should return status 400 and a error message for empty body", async () => {
        const response = await supertest(app)
            .post("/order/")
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send();
        expect(response.status).to.equal(400);
        expect(response.text).to.equal("Bad Request");
    });
});

describe("Order Update API", function () {
    it("should return unauthorized error", async () => {
        const response = await supertest(app)
            .put(`/order/${orderID}`)
            .send({
                services: ["Testing", "Analysis"],
            });
        expect(response.status).to.equal(401);
        expect(response.text).to.equal("Unauthorized");
    });

    it("should forbid updating the order within 3 hours", async () => {
        const response = await supertest(app)
            .put(`/order/${orderID}`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send({
                services: ["Inspection"],
            });
        expect(response.status).to.equal(403);
        expect(response.text).to.equal(
            "You are not allowed to update the order within 3 hours of creation/updation."
        );
    });

    it("should return status 400 and a error message when passing empty body", async () => {
        const response = await supertest(app)
            .put(`/order/${orderID}`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send({});
        expect(response.status).to.equal(400);
        expect(response.text).to.equal("Bad Request");
    });

    it("should return status 400 and a error message when passing invalid orderID", async () => {
        const response = await supertest(app)
            .put(`/order/${invalidOrderID}`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send({
                services: ["Inspection"],
            });
        expect(response.status).to.equal(400);
        expect(response.text).to.equal("Invalid OrderId provided!");
    });

    // it("should allow updating the order after 3 hours", async function () {
    //     const clock = sinon.useFakeTimers(new Date());
    //     clock.tick(3 * 60 * 60 * 1000);
    //     const response = await supertest(app)
    //         .put(`/order/${orderID}`)
    //         .set("Authorization", `Bearer ${jwtTokenAdmin}`)
    //         .send({
    //             services: ["Inspection"],
    //         });
    //     expect(response.status).to.equal(200);
    //     expect(response.text).to.equal("Order updated successfully");
    // });
});

describe("Order Get API", () => {
    it("it should get the order and return status 200", async () => {
        const response = await supertest(app)
            .get(`/order/${orderID}`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send();
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("_id");
        expect(response.body).to.have.property("services");
        expect(response.body).to.have.property("totalFee");
        expect(response.body).to.have.property("createdAt");
        expect(response.body).to.have.property("updatedAt");
        expect(response.body).to.have.property("user");
    });

    it("it should return status 404 and a error message", async () => {
        const response = await supertest(app)
            .get(`/order/${invalidOrderID}`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send();
        expect(response.status).to.equal(404);
        expect(response.text).to.equal("Order not found!");
    });

    it("it should get all orders using admin token and return status 200", async () => {
        const response = await supertest(app)
            .get(`/order/`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send();
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.equal(1);
        response.body.forEach((item) =>
            expect(item).to.be.jsonSchema(orderSchema)
        );
    });

    it("it should get user orders using user token and return status 200", async () => {
        const response = await supertest(app)
            .get(`/order/`)
            .set("Authorization", `Bearer ${jwtTokenUser}`)
            .send();
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.equal(0);
        response.body.forEach((item) =>
            expect(item).to.be.jsonSchema(orderSchema)
        );
    });
});

describe("Order Delete API", () => {
    it("it should return unauthorized error", async () => {
        const response = await supertest(app)
            .delete(`/order/${orderID}`)
            .send();
        expect(response.status).to.equal(401);
        expect(response.text).to.equal("Unauthorized");
    });

    it("it should return status 404 and a error message", async () => {
        const response = await supertest(app)
            .delete(`/order/${invalidOrderID}`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send();
        expect(response.status).to.equal(404);
        expect(response.text).to.equal("Order not found!");
    });

    it("it should return forbidden error when user tries to delete admin's order", async () => {
        const response = await supertest(app)
            .delete(`/order/${orderID}`)
            .set("Authorization", `Bearer ${jwtTokenUser}`)
            .send();
        expect(response.status).to.equal(403);
        expect(response.text).to.equal("Forbidden");
    });

    it("it should delete order from Database", async () => {
        const response = await supertest(app)
            .delete(`/order/${orderID}`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send();
        expect(response.status).to.equal(200);
        expect(response.text).to.equal("Order deleted successfully!");
    });

    after("it should delete user from Database", async () => {
        const response = await supertest(app)
            .delete(`/user/${emailAdmin}`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send();
        expect(response.status).to.equal(200);
        expect(response.text).to.equal("User deleted successfully!");

        const response1 = await supertest(app)
            .delete(`/user/${emailUser}`)
            .set("Authorization", `Bearer ${jwtTokenAdmin}`)
            .send();
        expect(response1.status).to.equal(200);
        expect(response1.text).to.equal("User deleted successfully!");
    });
});
