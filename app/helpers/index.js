const constants = require('./constants');
const error = require('./error');
const messages = require('./messages');

module.exports = {
  constants,
  ...error,
  ...messages
};
