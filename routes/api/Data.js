var express = require('express'),
    router = express.Router(),
    NGSharedKernel = require('NGSharedKernel'),
    broker = require('./../../config/config.json').broker,
    events = require('events');

module.exports = function (app) {
    var result = {
        message: "test"
    },
        message = {},
        messageDispatcher = null,
        messageReceiver = null,
        messageReceiverRet = null,
        arrayMessageListeners = [];

    Kernel = new NGSharedKernel(),
    connectionSubReturn = {
        'type': 'rabbitmq',
        'connection': {
            'amqp': 'amqp://' + broker.host + ':' + broker.port,
            'type': 'SUB',
            'channel': 'channel02'
        }
    },
    eventEmitter = new events.EventEmitter(),
    arrayResponses = {};

    messageReceiver = Kernel.create('MessageReceiver', connectionSubReturn);
    messageDispatcher = createMessageDispatcher('channel01', broker);
    messageReceiver.subscribe(function (err, data) {
        var dataResult = JSON.parse(data.toString());
        eventEmitter.emit('doorOpen', JSON.parse(data.toString()));
    });

    eventEmitter.on('doorOpen', function (request) {
        try {
            arrayResponses[request.random].json(request.data);
        }
        catch (e) {
            console.log("error", e);
        }
        delete arrayResponses[request.random];
    });

    router.get('/message/:event', function (req, res) {

        var that = this,
            random = parseInt(Math.random() * 10000000),
            testRecord = {

                "id": "record-id-893792",
                "event": "query",
                "type": req.params.event,

                "version": 1,
                "created_by": "user-reference-21",
                "creation_date": "99327498272",
                "modified_by": "user-reference-21",
                "modification_date": "99327498272",
                "data": {
                    "first_name": "Jonathan jonathan",
                    "last_name": "Soto",
                    "phone": "78192221"
                },
                "schema": {
                    "set": "record-id-02892",
                    "version": 1
                }
            },
            nameResponseRandom = "event-" + random.toString();

        arrayResponses[nameResponseRandom] = res;
        testRecord.random = nameResponseRandom;
        messageDispatcher.sendMessage(JSON.stringify(testRecord), function (err, result) {
            console.log("[x] - send message");
        });
    });

    router.post('/message', function (req, res) {
        var that = this,
            random = parseInt(Math.random() * 10000000),
            message = req.body,
            nameResponseRandom = "event-" + random.toString();
        req.body.random = nameResponseRandom;
        arrayResponses[nameResponseRandom] = res;
        messageDispatcher.sendMessage(JSON.stringify(req.body), function (err, result) {
            console.log("[x] - send message");
        });
    });

    function createMessageDispatcher(channel, brokeramqp) {
        var kernel = new NGSharedKernel();
        var connection = {
            'amqp': 'amqp://' + brokeramqp.host + ':' + brokeramqp.port,
            'channel': channel,
            'exchange': 'direct'
        };
        var dispatcher = kernel.create('MessageDispatcher', connection);
        return dispatcher;
    };
    return router;
};