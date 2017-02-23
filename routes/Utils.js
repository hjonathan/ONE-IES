var OneKernel = require('OneKernel'),
    _ = require("lodash");
module.exports = {
  createMessageDispatcher : function (conf, broker) {
      var kernel = new OneKernel(),
          dispatcher,
          connection;

      connection = {
          'amqp': 'amqp://' + broker.host + ':' + broker.port,
          'channel': conf.channel+"_Dispatcher",
          'exchange': 'direct'
      };
      dispatcher = kernel.create('MessageDispatcher', connection);
      return dispatcher;
  },
  createMessageReceiver : function (conf, broker){
      var messageReceiver,
          connection,
          kernel = new OneKernel();

      connection = {
          'type': 'rabbitmq',
          'connection': {
              'amqp': 'amqp://' + broker.host + ':' + broker.port,
              'type': 'SUB',
              'channel': conf.channel+"_Receiver",
          }
      }
      messageReceiver = kernel.create('MessageReceiver', connection);
      return messageReceiver;
  },
  initEmitter : function (eventEmitter, arrayResponses){
    if(eventEmitter.on && _.isObject(arrayResponses)){
      eventEmitter.on('doorOpen', function (request) {
          try {
              arrayResponses[request.random].json(request.data);
          }
          catch (e) {
              console.log("error", e);
          }
          delete arrayResponses[request.random];
      });
    }
    return this;
  }
};
