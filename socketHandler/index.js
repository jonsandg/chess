var chessHandler = require('../chessHandler');
var chatHandler = require('./chatHandler');

let io;

let socketHandler = {};

socketHandler.attachIO = (ioInstance) => {
  
  io = ioInstance;
  io.on('connection', (socket) => {
    
    const username = socket.request.session.passport ? socket.request.session.passport.user : null;
    socket.username = username;
    console.log('new con', username);
    if(username)
      socket.join(username);
    
    socket.on('join game room', function(data) {
      socket.join(`game-${data}`);
    });
    
    //chess
    socket.on('chess move', function(data) {
      if(!socket.username) return;
      chessHandler.makeMove(data, socket.username);
    });
    
    //chat
    socket.on('chat', function(data) {
      console.log('got chat', data);
      if(!socket.username) return;
      const type = data.type;
      const from = socket.username;
      const to = data.to;
      const message = data.message;
      if(!message || !to || !type) return;
      
      
      
      let callback;
      switch(type) {
        case 'private':
          callback = message => {
            io.in(from).emit('chat', message);
            io.in(to).emit('chat', message);
          };
          break;
        case 'game':
          callback = message => {
            io.in(`game-${to}`).emit('chat', message);
          };
          break;
        case 'room':
          callback = message => {
            io.emit('chat', message); //only general implemented
          };
          break;
      }
      
      chatHandler.newMessage(from, to, type, message, callback);
      
    });
  });
};

socketHandler.notifyNewFriend = (user, friend) => {
  console.log('notifying about new friend');
  io.in(user).emit('new friend', friend);
  io.in(friend).emit('new friend', user);
};

socketHandler.notifyNewFriendRequest = (from, to) => {
  console.log('notifying about new friend req');
  io.in(to).emit('new friend request', from);
};

socketHandler.notifyGameUpdate = (gameID, data) => {
  console.log('notifying about game update', gameID);
  io.in(`game-${gameID}`).emit('game', data);
};

socketHandler.updateGameList = (games) => {
  io.emit('gamelist', games);
};

chessHandler.listen((type, data) => {
  switch(type) {
    case 'gamelist':
      socketHandler.updateGameList(data);
      break;
    case 'game':
      socketHandler.notifyGameUpdate(data.gameID, data);
      break;
  }
}); 

module.exports = socketHandler;

//asd