'use strict';

module.exports = function enableAuthentication (server) {
  var debug = require('debug')('app-site');
  /**
   * Enable Authentication
   */
  debug('enabling authentication');
  server.enableAuth();
};
