'use-strict';

const {bookshelf,knex} = require('../knex');
const Orders = bookshelf.Model.extend({
  tableName: 'orders',
  softDelete: false,
  requireFetch: false,
  setJoins(qb){
    qb.clearSelect();
    qb.select(knex.raw(`orders.id, orders."dateTime" as "datetime", sum(s.fee) as "totalfee", array_agg(json_build_object('id',s.id)) as "services"`))
    qb.joinRaw('left join services s on s.id = ANY(array[orders.services])')
    qb.groupBy('orders.id','orders.dateTime')
  }
});

module.exports = bookshelf.model('orders', Orders);