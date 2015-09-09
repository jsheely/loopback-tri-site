'use strict';
module.exports = function (server) {
    var cfg = require('app-core').config;
    var csrf = require('csurf');

    // Prevent Cross-Site Request Forgery
    server.use(csrf());

    // Keep user, csrf token and config available
    server.use(function (req, res, next) {
        res.locals.user = req.user;
        res.locals.config = cfg;
        res.locals._csrf = req.csrfToken();
        next();
    });
}