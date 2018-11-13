var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var Game = new Schema({
  white: String,
  black: String,
  status: String,
  pgn: {type: String, default: ''},
  captured: {type: [], default: []},
  message: {type: String, default: null}
  
});

Game.plugin(autoIncrement.plugin, {
  model: 'Game',
  field: 'gameID',
});

 
module.exports = mongoose.model('Game', Game);