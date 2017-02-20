var Receiver = require('../../model/Data.js');

var sinonChai = require('sinon-chai');
var sinon  = require('sinon');
var chai   = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('Data Moc', function () {
    describe("#connect()", function () {
        var dataReceiver;
        beforeEach(function () {
            dataReceiver = new Receiver();
        });
        
        it ('should connect and retrieve data', function (done) {
            var dataToken = {};
            var expectedToken = {};
            
            dataReceiver.connect(function (err, result) {
                expect(result).to.be.a('object');
                expect(result).to.be.deep.equal(expectedToken);
                done();
            });
        });
        
        after(function() {
            
        });
    });
	
	describe("#sendMessage()", function () {
        var dataReceiver;
        beforeEach(function () {
            dataReceiver = new Receiver();
        });
        
        it ('should connect and retrieve data', function (done) {
            var dataToken = {};
            var expectedToken = {};
            
            dataReceiver.sendMessage(function (err, result) {
                expect(result).to.be.a('object');
                expect(result).to.be.deep.equal(expectedToken);
                done();
            });
        });
        
        after(function() {
            
        });
    });
});