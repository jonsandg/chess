var Game = require('./game');
var Message = require('./message');

let helpers = {};

helpers.getGames = (cb) => {
  console.log('getting games');

  Game.find({status : {$ne: 'finished'}}).lean()
  .then(games => {
    
    games = games.map(game => {
      const user = game.white ? game.white : game.black;
      if(game.status === 'waiting')
        title = user + ' waiting for an opponent';
      else
        title = game.white + ' vs. ' + game.black;
      return {
        gameID: game.gameID,
        status: game.status,
        title: title
      };
    });
    
    let waiting = games.filter(game => {
      return game.status === 'waiting';
    });
    let playing = games.filter(game => {
      return game.status === 'started';
    });
    
    cb({waiting: waiting,
        playing: playing});
    
  });
  
};

helpers.getMessages = (type, room, cb) => {

  if(type === 'private') {
    const user1 = room[0];
    const user2 = room[2];
    
    Message.find({ type: type,
                   $or: [{from: user1, to: user2},
                         {from: user2, to: user1}]})
    .then(messages => {
      messages = messages.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
      cb(messages);
    });
  } else {
    Message.find({ type: type, to: room})
    .then(messages => {
      messages = messages.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
      cb(messages);
    });
  }
  
};

module.exports = helpers;