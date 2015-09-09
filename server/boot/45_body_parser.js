'use strict';
module.exports = function bodyParser(server) {

  /**
   * Module Dependencies
   */

  var debug      = require('debug')('app-site');
  var bodyParser = require('body-parser'); // https://github.com/expressjs/body-parser
  // var multer = require('multer');

  debug('enabling body parser');


  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: true }));

  // parse application/json
  server.use(bodyParser.json());

  // server.use(multer({
  //   inMemory: true
  // }));

};
