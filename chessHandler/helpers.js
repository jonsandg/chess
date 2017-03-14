let Chess = require('../chess.min.js');

module.exports.chess = (pgn, isServer) => {

  let chess = isServer? new Chess.Chess() : new Chess(); //works different for client/server ??
  if(pgn) {
    chess.load_pgn(pgn);
  }
  
  chess.getMoves = function(i, j) {
  
    const san = convertToSAN(i, j);
    let moves = this.moves({square: san});

    console.log(i);
    console.log(moves);
    moves = moves.map(val => {
      
      const ijValues = convertFromSAN(val);
      
      if (ijValues === 'KINGSIDE_CASTLE')
        return [i, j+2];
      
      if (ijValues === 'QUEENSIDE_CASTLE')
        return [i, j-2];
      
      return ijValues;
    });
    console.log(moves);
    return moves;
  };
  
  return chess;
};

const convertToSAN = (i, j) => {
  return `${letters[j]}${8-i}`;
};

const convertFromSAN = (san) => {
  
  if(san === 'O-O') {
    return 'KINGSIDE_CASTLE';
  }
  
  if(san === 'O-O-O') {
    return 'QUEENSIDE_CASTLE';
  }
  
  if(san.length > 2) {
    let indexOfNumber;
    for(let i = 0; i<san.length; i++){
      if(!isNaN(san[i]))
        indexOfNumber = i;
    }
    san = san[indexOfNumber-1] + san[indexOfNumber];
  }
    

  console.log(san);
  const indexOfLetter = letters.indexOf(san[0]);
  return [parseInt(8-san[1]), indexOfLetter];
};

module.exports.convertToSAN = convertToSAN;
module.exports.convertFromSAN = convertFromSAN;

/*
module.exports.getMoves = (i, j) => {
  
  let moves = chess.moves({square: `${letters[j]}${8-i}`});
  
  moves = moves.map(val => {
    
    console.log(val);
    if(val.length === 3)
      val = val.substring(1, 3);
    
    const indexOfLetter = letters.indexOf(val[0]);
    return [parseInt(8-val[1]), indexOfLetter];
  });
  console.log(moves);
  return moves;
}; */

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];