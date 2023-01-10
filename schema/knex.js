const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig);


const bookshelf = require('bookshelf')(knex);
bookshelf.plugin(require('./models/base-model'));

module.exports = {
  bookshelf,
  knex
};