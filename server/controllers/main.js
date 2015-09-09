'use strict';

module.exports.controller = function (app) {
	app.get('/', function (req, res) {		
		res.render("main/index");
	});
	
	app.get('/home', function (req, res) {		
		res.render("main/index");
	});
	
}