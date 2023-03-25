import * as transport from "winston-transport";
const moment = require("moment");
const util = require("util");
const sqsModel = require("../sqs/sqs");
class customtransport extends transport {
  constructor(opts) {
    super(opts);
    console.log("sqsModel", sqsModel);
  }
  async log(info, callback) {
    const { message, level } = info;
    const finalObj = {
      message,
      timestamp: moment().format("YYYY-MM-MM HH:mm:ss.SSS"),
      level,
      serviceType: "Win_Assignement",
    };
    callback();
  }
}
export default customtransport;
