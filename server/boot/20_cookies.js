'use strict';
module.exports = function cookies(server) {

  /**
   * Module Dependencies
   */

  var cfg = require('app-core').config;
  var debug         = require('debug')('app-site');
  var loopback      = server.loopback;

  /**
   * Identification
   */

  debug('enabling cookies');

  /**
   * Use signed cookies
   */


  server.use(loopback.cookieParser(cfg.cookieSecret));

  server.use(server.loopback.token({
    model: server.models.accessToken
  }));

};
