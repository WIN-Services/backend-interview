const Orders = require('../schema/models/orders')
const Services = require('../schema/models/services')
const BaseController = require('./base-controller')

module.exports = class OrderController extends BaseController {
  constructor() {
    super(Orders)
    this.Model = Orders;
  }

 async _validate(options) {
    const dto = options.body;
    const ve = []
    if (!dto.services || !Array.isArray(dto.services))
      ve.push(`order must have valid services`)
    else if (dto.services.some(service => !Number.isInteger(service)))
      ve.push(`services must be valid integers`)

    //check for pre-existing orders
    if (!ve.length) {
      const now = new Date();
      const existingOrder = await this.Model.forge().query(qb => {
        qb.where('dateTime', '>', new Date(now.setHours(now.getHours() - 3)))
        qb.orderBy('dateTime', 'desc')
      }).fetch({ limit: 1 })

      if (existingOrder)
        ve.push(`Last order was created on ${existingOrder.attributes.dateTime}. you must wait 3 hours after this to create or update an order.`)
    }

    //check if all services are valid
    if (!ve.length) {
      let existingServices = await Services.forge().getAll(options).fetchAll();
      if (existingServices.length) {
        existingServices = existingServices.models.map(service => service.attributes.id)
        if (dto.services.some(service => !existingServices.includes(service)))
          ve.push('services choosen must be valid.')
      }
    }
    return ve;
  }

  _mapToDBObj(options) {
    const obj = options.obj;
    const dto = options.body;
    obj.set('services', dto.services);
    if (options.op == BaseController.CREATE_OP)
      obj.set('dateTime', new Date());

    obj.unset('totalfee')

    return obj;
  }
}
