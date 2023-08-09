const { expect } = require("chai");
const request = require("supertest");
const app = require("../server"); // Adjust the path to your app

describe("Order Controller", () => {
  let server; // Declare a variable to hold the server instance

  before((done) => {
    server = app.listen(0, () => {
      done();
    });
  });

  after((done) => {
    server.close(() => {
      console.log("Server closed.");
      done();
    });
  });

  it("should retrieve a list of orders", (done) => {
    request(server)
      .get("/orders") // Use the relative path to your route
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body);
        done();
      });
  });

  // we can add more test cases for other controller functions
});
