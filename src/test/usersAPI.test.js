const { expect } = require("chai").use(require("chai-json-schema"));
const supertest = require("supertest");
const app = require("./../app.js");

let jwtToken;
const email = "testUser@win.com";

const userSchema = {
    title: "userSchema",
    type: "object",
    required: [
        "firstname",
        "lastname",
        "email",
        "password",
        "gender",
        "dob",
        "role",
    ],
};

describe("User Register API", () => {
    it("should register a user and return status 201 and a success message", async () => {
        const response = await supertest(app).post("/user/register").send({
            firstname: "testuser",
            lastname: "test",
            email: email,
            password: "testpassword",
            gender: "male",
            dob: "02/12/2000",
            role: "Admin",
        });
        expect(response.status).to.equal(201);
        expect(response.text).to.equal("user registered successfully");
    });

    it("should return status 400 and a error message", async () => {
        const response = await supertest(app).post("/user/register").send({
            firstname: "testuser",
            lastname: "test",
            email: email,
            gender: "male",
            dob: "02/12/2000",
            role: "Admin",
        });
        expect(response.status).to.equal(400);
        expect(response.text).to.equal("Bad Request");
    });

    it("should return status 500 and a error message for duplicate user entry", async () => {
        const response = await supertest(app).post("/user/register").send({
            firstname: "testuser",
            lastname: "test",
            email: email,
            password: "testpassword",
            gender: "male",
            dob: "02/12/2000",
            role: "Admin",
        });
        expect(response.status).to.equal(500);
        expect(response.text).to.equal("Internal Server Error");
    });
});

describe("User Login API", () => {
    it("it should authenticate the user and return a JWT token", async () => {
        const response = await supertest(app).post("/user/login").send({
            email: "testUser@win.com",
            password: "testpassword",
        });
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("access_token");
        expect(response.body).to.have.property("refresh_token");
        expect(response.body).to.have.property("user");
        jwtToken = response.body.access_token;
    });

    it("it should return status 404 and a error message", async () => {
        const response = await supertest(app).post("/user/login").send({
            email: "test@win.com",
            password: "testpassword",
        });
        expect(response.status).to.equal(404);
        expect(response.text).to.equal("User not found! Please Sign Up");
    });

    it("it should return status 400 and a error message", async () => {
        const response = await supertest(app).post("/user/login").send({
            email: "test@win.com",
        });
        expect(response.status).to.equal(400);
        expect(response.text).to.equal("Bad Request");
    });
});

describe("User Get API", () => {
    it("it should get the user and return status 200", async () => {
        const response = await supertest(app)
            .get(`/user/${email}`)
            .set("Authorization", `Bearer ${jwtToken}`)
            .send();
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("firstname");
        expect(response.body).to.have.property("lastname");
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("password");
        expect(response.body).to.have.property("gender");
        expect(response.body).to.have.property("dob");
    });

    it("it should return status 404 and a error message", async () => {
        const response = await supertest(app)
            .get(`/user/test@win.com`)
            .set("Authorization", `Bearer ${jwtToken}`)
            .send();
        expect(response.status).to.equal(404);
        expect(response.text).to.equal("User not found!");
    });

    it("it should get all users and return status 200", async () => {
        const response = await supertest(app)
            .get(`/user/`)
            .set("Authorization", `Bearer ${jwtToken}`)
            .send();
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an("array");
        expect(response.body.length).to.equal(1);
        response.body.forEach((item) =>
            expect(item).to.be.jsonSchema(userSchema)
        );
    });
});

describe("User Update API", () => {
    it("it should update the user and return status 200", async () => {
        const response = await supertest(app)
            .put(`/user/${email}`)
            .set("Authorization", `Bearer ${jwtToken}`)
            .send({ firstname: "testUser" });
        expect(response.status).to.equal(200);
        expect(response.text).to.equal("User record updated successfully!");
    });

    it("it should return status 400 and a error message", async () => {
        const response = await supertest(app)
            .put(`/user/${email}`)
            .set("Authorization", `Bearer ${jwtToken}`)
            .send({ invalidKey: "value" });
        expect(response.status).to.equal(400);
        expect(response.text).to.equal("Bad Request");
    });
});

describe("User Delete API", () => {
    it("it should return status 404 and a error message", async () => {
        const response = await supertest(app)
            .delete(`/user/test@win.com`)
            .set("Authorization", `Bearer ${jwtToken}`)
            .send();
        expect(response.status).to.equal(404);
        expect(response.text).to.equal("User not found!");
    });

    it("it should delete user from Database", async () => {
        const response = await supertest(app)
            .delete(`/user/${email}`)
            .set("Authorization", `Bearer ${jwtToken}`)
            .send();
        expect(response.status).to.equal(200);
        expect(response.text).to.equal("User deleted successfully!");
    });
});

// describe("Orders API", () => {
//     before("Register user and generate jwtToken", async () => {
//         const response = await supertest(app).post("/user/register").send({
//             firstname: "testuser",
//             lastname: "test",
//             email: email,
//             password: "testpassword",
//             gender: "male",
//             dob: "02/12/2000",
//             role: "Admin",
//         });
//         expect(response.status).to.equal(201);
//         expect(response.text).to.equal("user registered successfully");

//         const response1 = await supertest(app).post("/user/login").send({
//             email: "testUser@win.com",
//             password: "testpassword",
//         });
//         expect(response1.status).to.equal(200);
//         expect(response1.body).to.have.property("access_token");
//         expect(response1.body).to.have.property("refresh_token");
//         expect(response1.body).to.have.property("user");
//         jwtToken = response1.body.access_token;
//     });

//     it("it should get the user and return status 200", async () => {
//         const response = await supertest(app)
//             .get(`/user/${email}`)
//             .set("Authorization", `Bearer ${jwtToken}`)
//             .send();
//         expect(response.status).to.equal(200);
//         expect(response.body).to.have.property("firstname");
//         expect(response.body).to.have.property("lastname");
//         expect(response.body).to.have.property("email");
//         expect(response.body).to.have.property("password");
//         expect(response.body).to.have.property("gender");
//         expect(response.body).to.have.property("dob");
//     });

//     it("it should update the user and return status 200", async () => {
//         const response = await supertest(app)
//             .put(`/user/${email}`)
//             .set("Authorization", `Bearer ${jwtToken}`)
//             .send({ firstname: "testUser" });
//         expect(response.status).to.equal(200);
//         expect(response.text).to.equal("User record updated successfully!");
//     });

//     it("it should get all users and return status 200", async () => {
//         const response = await supertest(app)
//             .get(`/user/`)
//             .set("Authorization", `Bearer ${jwtToken}`)
//             .send();
//         expect(response.status).to.equal(200);
//         expect(response.body).to.be.an("array");
//         expect(response.body.length).to.equal(1);
//         response.body.forEach((item) =>
//             expect(item).to.be.jsonSchema(userSchema)
//         );
//     });

//     after("Delete User from Database", async () => {
//         const response = await supertest(app)
//             .delete(`/user/${email}`)
//             .set("Authorization", `Bearer ${jwtToken}`)
//             .send();
//         expect(response.status).to.equal(200);
//         expect(response.text).to.equal("User deleted successfully!");
//     });
// });
