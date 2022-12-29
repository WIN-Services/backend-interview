const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

mongoose.connect("mongodb://mukul:suGdFMIE7ls74TiB@ac-huaewrk-shard-00-00.2ovxeqb.mongodb.net:27017,ac-huaewrk-shard-00-01.2ovxeqb.mongodb.net:27017,ac-huaewrk-shard-00-02.2ovxeqb.mongodb.net:27017/?ssl=true&replicaSet=atlas-ewzs00-shard-0&authSource=admin&retryWrites=true&w=majority");

request(app, { http2: false })
  .post('/order/create')
  .expect('Content-Type', /json/)
//   .expect('Content-Length', '500')
  .expect(201)
  .end(function(err, res) {
    if (err) throw err;
  });

request(app, { http2: false })
  .get('/order/all')
  .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
