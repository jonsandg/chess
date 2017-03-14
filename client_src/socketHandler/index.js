import tree from 'state';
import { resetPossibleMoves } from 'state';
import {getIndexOfPrivate, getPrivateChat} from 'containers/Chatmenu/actions';
var Chess = require('chess.js');

let socket;

const connect = () => {
  if(socket)
    socket.close();
  socket = io();
  
  socket.on('new friend request', data => {
    console.log(data);
    tree.push(['user', 'friendRequests'], data);
  });
  
  socket.on('new friend', data => {
    console.log(data);
    tree.push(['user', 'friends'], {name: data, online: true});
  });
  
  socket.on('game', data => {
    const game = tree.select('game');
    if(data.gameID !== game.get('id')) //only update if the update is about the game we're watching
      return;
    
    const user = tree.get(['user', 'name']);
    
    game.set('pgn', data.pgn);
    game.set('captured', data.captured);
    game.set('white', data.white);
    game.set('black', data.black);
    game.set('message', data.message);
    game.set('status', data.status);
    
    resetPossibleMoves();
  });
  
  socket.on('gamelist', games => {
    console.log('got new games');
    tree.set('activeGames', games);
  });
  
  socket.on('chat', data => {
    console.log('got new chatmsg', data);
    const chat = tree.select('chat');
    
    switch(data.type) {
      case 'room':
        chat.unshift(['chats', 'general', 'messages'], data);
        break;
      case 'game':
        if(data.to != tree.get(['game', 'id'])) return;
        chat.unshift(['chats', 'game', 'messages'], data);
        break;
      default: //PM
        const user = tree.get('user', 'name');
        
        const chatuser = user === data.from ? data.to : data.from;
        const privates = chat.get(['chats', 'privates']);
        const index = getIndexOfPrivate(privates, chatuser);
        if (index < 0) { //om inte finns i listan
          getPrivateChat(tree, chatuser)
          .then(() => {
            tree.unshift(['chat', 'chats', 'privates', privates.length, 'messages'], data);
          });
        } else {
          tree.unshift(['chat', 'chats', 'privates', index, 'messages'], data);
        }
    }
    
  });
};

const makeMove = (game, from, to) => {
  
  console.log('sending move actually');
  socket.emit('chess move', {gameID: game,
                             from: from,
                             to: to});
};

const joinGameRoom = (game) => {
  socket.emit('join game room', game);
};


const sendMessage = (to, type, message) => {
  console.log('sending msg');
  socket.emit('chat', {
    type: type,
    to: to,
    message: message
  });
};

const increase = value => {
  return value+1;
}

export {connect, makeMove, joinGameRoom, sendMessage};
