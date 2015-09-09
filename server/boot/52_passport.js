'use strict';
module.exports = function passport(server) {

  /**
   * Passport Configurator Dependencies
   */

  var _                = require('lodash');
  var debug            = require('debug')('app-site');
  var loopbackPassport = require('loopback-component-passport');

  /**
   * Identification
   */

  debug('enabling passport');

  /**
   * Process Passport Providers
   */

  var env = server.get('env');
  var config = {};
  var PassportConfigurator = loopbackPassport.PassportConfigurator;
  var passportConfigurator = new PassportConfigurator(server);

  passportConfigurator.init();

  // passportConfigurator.setupModels({
  //   userModel: server.models.user,
  //   userIdentityModel: server.models.userIdentity,
  //   userCredentialModel: server.models.userCredential
  // });

  // read in providers
  try {
    config = require('../config/providers.' + env + '.json');
  } catch (err) {
    console.trace(err);
    process.exit(1); // fatal
  }

  // process providers (use lodash to iterate over the object)
  _.forOwn(config, function (options, provider) {
    options.session = options.session !== false;
    passportConfigurator.configureProvider(provider, options);
  });

};
