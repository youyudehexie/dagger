var _ = require('lodash');

// Load app configuration
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
module.exports = _.extend(
  require('./node_env/base.js'),
  require('./node_env/' + process.env.NODE_ENV + '.js') || {});
