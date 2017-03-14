import {resetPossibleMoves} from 'state';
import {makeMove, joinGameRoom } from 'socketHandler';
let chessHandler = require('chessHandler/helpers');

export const getGame = (tree, id) => {
  
  const game = tree.select('game');
  game.set('view', 'loading');
  console.log(tree.get());
  const user = tree.select(['user', 'name']).get();

  
  fetch(`/api/games/${id}`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      response.json()
      .then(response => {
        resetPossibleMoves();
        console.log('got game', response.gameID);
        
        joinGameRoom(response.gameID);

        console.log(response.white);
        const isPlayer = user && (user === response.white || user === response.black);
        const isWhite = !isPlayer || user === response.white; //see as white if not player
        
        
        game.set('captured', response.captured);
        game.set('message', response.message);
        game.set('isWhite', isWhite);
        game.set('white', response.white);
        game.set('black', response.black);
        game.set('view', 'game');
        game.set('id', response.gameID);
        game.set('status', response.status);
        game.set('pgn', response.pgn ? response.pgn : '');
        console.log(game.get());
      });
    } else {
      view.set('view', 'error');
    }
  })
  .catch((err) => {
    console.log(err);
  });

};

export const joinGame = (tree, id) => {
  
  fetch(`/api/games/${id}/join`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      console.log('getting game');
      getGame(tree, id);
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

export const click = (tree, i, j) => {
  const game = tree.select('game');
  const board = game.get('board');
  const possibleMoves = game.get('possibleMoves');
  const isWhite = game.get('isWhite');
  
  console.log(board[i][j]);
  
  if(possibleMoves[i][j]){
    console.log('sending move');
    const gameID = game.get('id');
    const movingFrom = game.get('moving');
    makeMove(gameID, movingFrom, [i, j]);
    return;
  }
  
  if(board[i][j] === null) //klick på tom ruta (som ej är möjlig förflyttelse)
    return resetPossibleMoves();
  
  
  if((board[i][j].color === 'b' && isWhite) || (board[i][j].color === 'w' && !isWhite)) //klick på motståndarens pjäser (ej möjlig attack)
    return resetPossibleMoves();
  
  findLegalMoves(game, i, j);
};

const findLegalMoves = (game, i, j) => {
  
  const pgn = game.get('pgn');
  const chess = chessHandler.chess(pgn);

  const moves = chess.getMoves(i, j);
  console.log(moves);
  
  var newPossibleMoves = [];
  for (let o = 0; o<8; o++) {
    newPossibleMoves.push([false, false, false, false, false, false, false, false, ]);
  }
  
  moves.forEach(
    (val) => {newPossibleMoves[val[0]][val[1]] = true;}
  );
  game.set('possibleMoves', newPossibleMoves);
  game.set('moving', [i, j]);
  
};

