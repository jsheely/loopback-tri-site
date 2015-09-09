'use strict';
module.exports = function validator(server) {

  /**
   * Module Dependencies
   */

  var debug      = require('debug')('app-site');
  var validator  = require('express-validator');

  /**
   * Identification
   */

  debug('enabling validator');

  /**
   * Easy form validation
   */

  server.use(validator());

};
