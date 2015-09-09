'use strict';



module.exports = function (server) {

    var config = require('app-core').config;
    var enforce = require('express-sslify');
    var path = require('path');
    var debug = require('debug')('app-site');


    debug('performing initialization');

    server.locals.env = server.get('env');
    server.locals.rawIncludes = false;

    /**
     * Setup the view engine (Jade)
     */
    server.set('views', path.resolve(__dirname, '../views'));
    server.set('view engine', 'jade');
    
    if (server.get('env') === 'development') {
        // Jade options: Don't minify html, debug intrumentation
        server.locals.pretty = true;
        server.locals.compileDebug = true;
        if (process.env.rawIncludes != null && process.env.rawIncludes == "true") {
            server.locals.rawIncludes = true;
        }
        // Pretty print json responses
        server.set('json spaces', 2);

    }

    if (server.get('env') === 'production') {
        // Jade options: minify html, no debug intrumentation
        server.locals.pretty = false;
        server.locals.compileDebug = false;
    }

    /**
     * Enforce SSL encryption in production
     */

    if (server.get('env') === 'production') {
        server.enable('trust proxy', 1);  // trust first proxy. see: http://expressjs.com/api.html
        server.use(enforce.HTTPS(true, true));
    }

};
