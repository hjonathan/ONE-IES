var Server = require('../NGEnterpriseIntegrationServices.js');
var request = require('supertest');

var sinonChai = require('sinon-chai');
var sinon  = require('sinon');
var chai   = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('Start Server API', function () {
    describe("#startServer()", function () {
        var serverApi;

        beforeEach(function () {
            serverApi = new Server();
            serverApi.StartServer();
        });
        
        it ('should connect to API with method GET', function (done) {
            request(serverApi.app)
              .get('/api/message')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200, done);
            //done();
        });
        
        it ('should connect to API with method PUT', function (done) {           
            request(serverApi.app)
              .put('/api/message')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200, done);
        });

        it ('should connect to API with method POST', function (done) {
            request(serverApi.app)
              .post('/api/message')
              .field("jonas","holas")              
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200, done);
        });
        
        it ('should connect to API with method DELETE', function (done) {
            request(serverApi.app)
              .delete('/api/message')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200, done);
        });

        it ('should connect to API with method DELETE', function (done) {
            request(serverApi.app)
              .delete('/api/message')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(200, done);
        });        
        
        after(function() {
            
        });
   });
});