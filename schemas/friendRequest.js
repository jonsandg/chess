var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('findorcreate-promise');

var FriendRequest = new Schema({
  from: {type: String, ref: 'User'},
  to: {type: String, ref: 'User'}
});

FriendRequest.plugin(findOrCreate);
 
module.exports = mongoose.model('FriendRequest', FriendRequest);