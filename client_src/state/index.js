import Baobab from 'baobab';
import {noMoves} from './constants';
var Chess = require('chess.js');

const tree = new Baobab({
  user: {
    name: null,
    friends: [],
    friendRequests: [],
    games: []
  },
  
  message: null,
  
  chat: {
    viewing: 'general',
    chats: {
      general: {
        name: 'general',
        new: 0,
        messages: []
      },
      game: {
        new: 0,
        name: 'game',
        messages: []
      },
      privates: [
        {
          name: 'lal',
          new: 2,
          messages: [
            {from: 'lal', message: 'qweqwe', date: '1'},
            {from: 'lal', message: 'qwe', date: '2'},
            {from: 'lalasd', message: 'tjoo', date: '3'},
            {from: 'lal', message: 'qwe', date: '4'},
          ]
        },
        {
          name: 'laasdl',
          new: 2,
          messages: [
            {from: 'lal', message: 'ghjghj', date: '1'},
            {from: 'lal', message: 'ghj', date: '2'},
            {from: 'lalasd', message: 'tjoo', date: '3'},
            {from: 'lal', message: 'ghjghj', date: '4'},
          ]
        }
      ]
        
      
    }
  },
  
  activeGames: {
    waiting: [],
    playing: []
  },
  
  game: {
    id: null,
    view: 'loading',
    isPlayer: false,
    isWhiteTurn: false,
    isWhite: true,
    white: null,
    black: null,
    board: [],
    png: null,
    captured: [],
    possibleMoves: noMoves,
    moving: null,
    turn: 0,
    status: null,
    message: null
  },
  
  sidemenu: 'signin',
  
  profile: null
});

const pgn = tree.select(['game', 'pgn']);
pgn.on('update', e => {
  
  const game = tree.select('game');
  
  const pgn = e.data.currentData;
  let chess = new Chess();
  if(pgn) 
    chess.load_pgn(pgn);
  
  const turn = chess.fen().split(' ').pop(); //sista siffran i FEN notationen = turn
  const isWhiteTurn = chess.turn() === 'w';
  
  console.log(chess.turn());
  
  game.set('isWhiteTurn', isWhiteTurn);
  game.set('turn', turn);
  game.set('board', chess.board());
  
  console.log(game.get());
});

export default tree;

export const resetPossibleMoves = () => {
  tree.set(['game', 'possibleMoves'], noMoves);
  tree.set(['game', 'moving'], null);
};

