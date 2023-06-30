let request = null;
const sinon = require("sinon");
const {v4:uuidv4}=require('uuid')
module.exports = () => {
  if (!request) {
    const init = require("../../app/common/init");
    init.connectAll();
    let supertest = require("supertest");
    //? stub for middlewares
   
    let app = require("../../app/server/index");
    app = app.listen(80, "scheduler");
    request = supertest(app);
    request.app = app;
  }
  return request;
};
