var core = require('app-core');
var app = module.exports = core.loopback;
var config = core.config;
var debug = require('debug')('app-site');
var boot = require('loopback-boot');
var path = require('path');

boot(app, path.resolve(__dirname, 'server'));

app.start = function () {

  // start the web server
  return app.listen(function () {
    app.emit('started');
    debug('listening in ' + app.settings.env.green + ' mode.');
    debug('Ctrl+C'.green + ' to shut down. ;)');
    console.log('listening on port ' + app.get('port'));

    // Exit cleanly on Ctrl+C
    process.on('SIGINT', function () {
      console.log('\n');
      debug('has ' + 'shutdown'.green);
      debug('was running for ' + Math.round(process.uptime()).toString().green + ' seconds.');
      process.exit(0);
    });

  });

};


if (require.main === module || (
  require.main.filename.indexOf('interceptor.js') !== -1 &&
  (require.main.children || []).indexOf(module) !== -1)
  ) {
  app.start();
}
