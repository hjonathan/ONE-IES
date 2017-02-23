var express = require('express'),
    router = express.Router(),
    OneKernel = require('OneKernel'),
    _ = require("lodash"),
    broker = require('./../config/config.json').broker,
    events = require('events'),
    Utils = require('./Utils');
    Responses = {};

module.exports = function (app, conf) {
    var api = conf.api,
        index,
        messageReceiver,
        messageDispatcher,
        emitter = new events.EventEmitter(),
        module = conf.module;

        messageReceiver = Utils.createMessageReceiver(conf, broker);
        messageDispatcher = Utils.createMessageDispatcher(conf, broker);
        messageReceiver.subscribe(function (err, data) {
            var dataResult;
            if(!err){
              dataResult = JSON.parse(data.toString());
              eventEmitter.emit('doorOpen', JSON.parse(data.toString()));
            }
        });
        Utils.initEmitter(emitter, Responses);

    if(_.isArray(api)){
        for (index = 0; index < api.length ; index ++){
            switch (api[index].method) {
              case "get":
                  router.get(api[index].route, function (req, res) {
                    var payload = {
                      method:"get"
                    };
                    _.extend(payload, req.params);
                    messageDispatcher.sendMessage(JSON.stringify(payload), function (err, result) {
                        console.log("[x] - send message");
                    });
                  });
              break;
              case "post":
                  router.post(api[index].route, function (req, res) {
                    var payload = {
                      method:"post"
                    };
                    _.extend(payload, req.params);
                    messageDispatcher.sendMessage(JSON.stringify(payload), function (err, result) {
                        console.log("[x] - send message");
                    });
                  });
              break;
              case "delete":
                  router.delete(api[index].route, function (req, res) {
                    var payload = {
                      method:"delete"
                    };
                    _.extend(payload, req.params);
                    messageDispatcher.sendMessage(JSON.stringify(payload), function (err, result) {
                        console.log("[x] - send message");
                    });
                  });
              break;
              case "update":
                  router.udpate(api[index].route, function (req, res) {
                    var payload = {
                      method:"update"
                    };
                    _.extend(payload, req.params);
                    messageDispatcher.sendMessage(JSON.stringify(payload), function (err, result) {
                        console.log("[x] - send message");
                    });
                  });
              break;
              default:
                router.get(api[index].route, function (req, res) {
                  var payload = {
                    method:"get"
                  };
                  _.extend(payload, req.params);
                  messageDispatcher.sendMessage(JSON.stringify(payload), function (err, result) {
                      console.log("[x] - send message");
                  });
                });
              break;
            };
        }
    }
    return router;
};
