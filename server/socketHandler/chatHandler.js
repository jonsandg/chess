var Message = require('../schemas/message');
var dbHelpers = require('../schemas/helpers');

let chatHandler = {};


chatHandler.newMessage = (from, to, type, message, cb) => {
  Message.create({from: from,
                  to: to,
                  type: type,
                  message: message})
  .then(message => {
    console.log(message);
    cb(message);
  });
};

module.exports = chatHandler;