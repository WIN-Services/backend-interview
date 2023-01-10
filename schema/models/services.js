'use-strict';

const {bookshelf,knex} = require('../knex');
const Services = bookshelf.Model.extend({
  tableName: 'services',
  softDelete: false,
  requireFetch: false
});

module.exports = bookshelf.model('services', Services);