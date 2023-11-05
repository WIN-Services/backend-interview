global._ = require("lodash");

const chai = require("chai");
chai.use(require("chai-properties"));
chai.use(require("chai-string")); // Load Chai assertions
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should();
//Load Sinon
const sinon = require("sinon");
// require('sinon-as-promised')(Promise);
global.sinon = sinon;
// Initialize Chai plugins //
chai.use(require("sinon-chai"));
chai.use(require("chai-as-promised"));
chai.use(require("chai-things"));
chai.use(require("chai-http"));
chai.use(require("chai-subset"));
global.chai = chai;
//global.__logger = require("../core/lib/log").logger;