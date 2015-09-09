'use strict';

module.exports = function statics(server) {

    /**
     * Module Dependencies
     */

    var path = require('path');
    var debug = require('debug')('app-site');

    /**
     * Identification
     */

    debug('enabling static assets');
    
    var loopback = server.loopback;
    var staticDir = path.resolve(__dirname, '../../client/');
    
    // time in milliseconds...
    var minute = 1000 * 60; //     60000
    var hour = (minute * 60); //   3600000
    var day = (hour * 24); //  86400000
    var week = (day * 7); // 604800000

    server.use(loopback.static(staticDir, {
        maxAge: week
    }));



};
