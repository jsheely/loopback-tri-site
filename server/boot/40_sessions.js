'use strict';
/*!
 * Inititialization
 * Copyright(c) 2014 WhenHub Inc.
 */

module.exports = function sessions(server) {

  /**
   * Module Dependencies
   */

  var cfg = require('app-core').config;
  var debug         = require('debug')('app-site');
  var loopback      = server.loopback;
  // var RedisStore    = require('connect-redis')(loopback.session);

  /**
   * Identification
   */

  debug('enabling sessions');

  /**
   * Use Redis for sessions in production
   */

  // Redis for session store
  // if(cfg.redis.enabled) {
  //   cfg.session.store = new RedisStore({
  //     host: cfg.redis.host,
  //     port: cfg.redis.port,
  //     pass: cfg.redis.password,
  //     ttl: 604800000
  //   });
  // }

  if (server.get('env') === 'production') {

    // // Turn on HTTPS/SSL cookies
     cfg.session.proxy = true;
     cfg.session.cookie.secure = true;

  }

  server.use(loopback.session(cfg.session));

  // confirm session (in case of db disconnect)
  server.use(function (req, res, next) {
    if (!req.session) {
      // handle error
      return next(new Error('Session does not exist!'));
    }
    next(); // otherwise continue
  });



};
