const { logger } = require("./../core/lib/log");
let loggerinfoStub = null;
let loggererrorStub = null;
before(function () {
  // disable console output
  loggerinfoStub = sinon.stub(logger, "info");
  loggererrorStub = sinon.stub(logger, "error");
  // sinon.stub(console, "log");
  // sinon.stub(console, "info");
  // sinon.stub(console, "warn");
  // sinon.stub(console, "error");
});
after(function () {
  loggerinfoStub.restore();
  loggererrorStub.restore();
  // console.log.restore();
  // console.info.restore();
  // console.warn.restore();
  // console.error.restore();
});
