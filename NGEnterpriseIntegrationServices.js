var express = require('express'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	broker = require('./config/config.json'),
	routes = require('./routes/routes.js'),	
	ngSharedKernel = require('NGSharedKernel');

var NGEnterpriseIntegrationServices = function() {
	this.kernel = new ngSharedKernel();
	this.logger = this.kernel.create('Logger', 'nextgen-eis');
	this.app = null;
};
/*
NGEnterpriseIntegrationServices.prototype.CreateServer = function(done) {
    //done(null, {});
};
*/
NGEnterpriseIntegrationServices.prototype.StartServer = function() {
	var self = this;
	this.app = express();
	this.app.use(bodyParser.json()); 
	this.app.use(bodyParser.urlencoded({ extended: true })); 
	this.app.use(multer());
	
	routes.addRoutes(this.app);
	var server = this.app.listen(8090, function () {
		var host = server.address().address,
		    port = server.address().port;	   
		self.logger.log('debug', 'Example app listening at http://%s:%s', host, port);
	}); 
    //done (null, []);
};
/*
NGEnterpriseIntegrationServices.prototype.ConfigurateServer = function(done) {
    //done (null, []);
};

NGEnterpriseIntegrationServices.prototype.startReceiver = function(done) {
    //done (null, []);
};

NGEnterpriseIntegrationServices.prototype.startDispatcher = function(done) {
    //done (null, []);
};
*/
module.exports = NGEnterpriseIntegrationServices;
