const crypto = require("crypto");
const cuid = require('cuid');

 function getOrderId(){
    var reqId = crypto.randomBytes(8).toString("hex");
    return reqId
 }

 function addHours(numOfHours, date) {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
  }

  function getId(){
    var id = cuid.slug();
    return id;
  }

 module.exports= {
    getOrderId, addHours, getId
}