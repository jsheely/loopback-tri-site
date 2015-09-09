'use strict';
module.exports = function flash(server) {

  /**
   * Module Dependencies
   */

  var debug = require('debug')('app-site');
  var flash = require('express-flash');

  debug('enabling flash messages');

  /**
   * Flash Messages
   */

  server.use(flash());

};
