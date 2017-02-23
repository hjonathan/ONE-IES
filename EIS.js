var express = require('express'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	_ = require("lodash"),
	conf = require('./config/config.json'),
	routes = require('./routes/RouterFinder.js');

var EIS = function() {
	this.app = null;
};

_.extend(EIS.prototype, {
	startServer : function() {
		var server, host, port, self = this;
		this.app = express();
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(multer());

		routes.addRoutes(this.app);
		server = this.app.listen(conf.server.port, function () {
			host = server.address().address,
			port = server.address().port;
			console.log('debug', 'Example app listening at http://%s:%s', host, port);
		});
	}
});

module.exports = EIS;
