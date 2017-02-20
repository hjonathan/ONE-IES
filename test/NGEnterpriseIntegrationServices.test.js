var rewire = require('rewire');
var sinonChai = require('sinon-chai');
var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(sinonChai);

var NGEnterpriseIntegrationServices = rewire('../NGEnterpriseIntegrationServices.js');

describe('Start Server API', function () {
    describe("#StartServer()", function () {
        var serverApi;
        var expressMock;
        var bodyParserMock;
        var multerMock;
        var routesMock;
        var appMock;
        beforeEach(function () {
            appMock = sinon.stub();
            appMock.use = sinon.spy();
            appMock.listen = function () { };
            appMock.listen = sinon.spy(appMock.listen);
            expressMock = sinon.stub();
            expressMock.withArgs().returns(appMock);
            bodyParserMock = sinon.spy();
            bodyParserMock.json = sinon.spy();
            bodyParserMock.urlencoded = sinon.spy();
            multerMock = sinon.spy();
            routesMock = sinon.spy();
            routesMock.addRoutes = sinon.spy();
            NGEnterpriseIntegrationServices.__set__('routes', routesMock);
            NGEnterpriseIntegrationServices.__set__('express', expressMock);
            NGEnterpriseIntegrationServices.__set__('multer', multerMock);
            NGEnterpriseIntegrationServices.__set__('bodyParser', bodyParserMock);
            serverApi = new NGEnterpriseIntegrationServices();
        });

        it('should connect to API with method GET', function (done) {
            serverApi.StartServer();
            expect(appMock.use.called).to.be.true;
            expect(appMock.listen.called).to.be.true;
            expect(bodyParserMock.json.called).to.be.true;
            expect(bodyParserMock.urlencoded.called).to.be.true;
            expect(routesMock.addRoutes.called).to.be.true;
            expect(multerMock.called).to.be.true;
            done();
        });

        afterEach(function () {

        });
    });
});