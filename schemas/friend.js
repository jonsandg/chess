var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('findorcreate-promise');

var Friend = new Schema({
  user1: {type: String, ref: 'User'},
  user2: {type: String, ref: 'User'}
});

Friend.plugin(findOrCreate);
 
module.exports = mongoose.model('Friend', Friend);