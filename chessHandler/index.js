var Game = require('../schemas/game');
var chessFunctions = require('./helpers');
var dbHelpers = require('../schemas/helpers');

let listener;

let chessHandler = {};

chessHandler.listen = (cb) => {
  listener = cb;
};

chessHandler.makeMove = (data, user) => {
  
  console.log('movniggg');
  
  const from = chessFunctions.convertToSAN(data.from[0], data.from[1]);
  const to = chessFunctions.convertToSAN(data.to[0], data.to[1]);
  
  Game.findOne({gameID: data.gameID}).lean()
  .then(game => {
    
    if(game && game.status === 'started') {
      console.log(game);
      let chess = chessFunctions.chess(game.pgn, true);
      const isPlayer = (user === game.white || user === game.black);
      const isWhite = user === game.white;
      const isWhiteTurn = chess.turn() === 'w';
      
      console.log('player:', isPlayer);
      console.log('white:', isWhite);
      console.log('whiteturn:', isWhiteTurn);
      console.log('turn:', chess.turn());
      console.log(chess.ascii());
      
      const isTurn = (isPlayer && ((isWhite && isWhiteTurn) || (!isWhite && !isWhiteTurn)));
      
      if(isTurn) {
        console.log('isstuuurn');
        const move = chess.move({from: from, to: to, promotion: 'q'});
        if (move) {
          const captured = move.captured ? [{type: move.captured,
                                             color: (isWhiteTurn ? 'b' : 'w')
                                            }] : [];

          let status = 'started';
          let message = null;
          if(chess.in_check()) {
            message = "Check!";
          }
          if(chess.in_draw()) {
            status = 'finished';
            message = 'Draw!';
          }
          
          if(chess.in_checkmate()) {
            status = 'finished';
            message = 'Checkmate! ' + (chess.turn() === 'w' ? 'Black' : 'White') + " wins!";
          }
          
          
          Game.findOneAndUpdate({gameID: game.gameID},
                                {$set : {
                                   pgn: chess.pgn(),
                                   captured: game.captured.concat(captured),
                                   status: status,
                                   message: message
                                 }},
                                 {new: true},
                                 (err, game) => {
            if(err)
              return console.log(err);
            console.log(game);
            listener('game', game);
            if(game.status === 'finished'){
              dbHelpers.getGames(games => {
                listener('gamelist', games);
              })
            }
          });
        } else {
          console.log('move failed');
        }
      }
      
    }
      
  });
};

module.exports = chessHandler;