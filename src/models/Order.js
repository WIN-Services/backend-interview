class Order {
  constructor(id, datetime, totalfee, services) {
    this.id = id;
    this.datetime = datetime;
    this.totalfee = totalfee;
    this.services = services;
  }
}

module.exports = Order;
