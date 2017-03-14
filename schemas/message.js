var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
  from: String,
  type: String,
  to: String,
  date: { type: Date, default: Date.now },
  message: String
});
 
module.exports = mongoose.model('Message', Message);