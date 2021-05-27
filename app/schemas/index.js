const users = require('./users');
const commons = require('./commons');

module.exports = {
  ...users,
  ...commons
};
