'use strict';

module.exports = function routing(server) {
    var path       = require('path');
    var debug      = require('debug')('app-site');
    var Promise    = require('bluebird');
    var fs         = Promise.promisifyAll(require('fs'));
    /**
     * Load Controllers
     */

    // Dynamically include routes (via controllers)
    fs.readdirAsync(path.resolve(__dirname, '../controllers')).map(function (file) {
        if (file.substr(-3) === '.js') {
            debug('enabling controller: ' + file);
            var route = require('../controllers/' + file);
            route.controller(server);
        }
    });
}