module.exports = function errorHandling(server) {
    var debug = require('debug')('app-site');
    
    
    // Handle 403 Errors
    server.use(function (err, req, res, next) {
        if (err.status === 403) {
            res.status(err.status);
            debug('403 Not Allowed. URL: ' + req.url + ' Err: ' + err);

            // Respond with HTML
            if (req.accepts('html')) {
                res.render('error/403', {
                    error: err,
                    url: req.url
                });
                return;
            }

            // Respond with json
            if (req.accepts('json')) {
                res.send({error: 'Not Allowed!'});
                return;
            }

            // Default to plain-text. send()
            res.type('txt').send('Error: Not Allowed!');

        } else {
            // Since the error is not a 403 pass it along
            return next(err);
        }
    });

    // Production 500 error handler (no stacktraces leaked to public!)
    if (server.get('env') === 'production') {
        server.use(function (err, req, res, next) {
            res.status(err.status || 500);
            debug('Error: ' + (err.status || 500).toString().red.bold + ' ' + err);
            return res.render('error/500', {
                error: {}  // don't leak information
            });
        });
    }

    // Development 500 error handler
    if (server.get('env') === 'development') {
        server.use(function (err, req, res, next) {
            console.log(err);
            if(err.status === 500) {
                res.status(err.status);
                debug('Error: ' + (err.status || 500).toString().red.bold + ' ' + err);
                return res.render('error/500', {
                    error: err
                });
            }
            next(err);
        });

    }


};