"use strict";

import React from 'react';

const chessCodes = {
  white: {
    p: '\u2659',
    n: '\u2658',
    b: '\u2657',
    r: '\u2656',
    q: '\u2654',
    k: '\u2655',
    
  },
  black: {
    p: '\u265F',
    n: '\u265E',
    b: '\u265D',
    r: '\u265C',
    q: '\u265A',
    k: '\u265B',
    
  }
};


class ChessPiece extends React.Component {
  render() {
    
    const color = this.props.piece.color === "b" ? "black" : "white";
    const type = this.props.piece.type;
    return (
      <span style={this.props.style} className="chesspiece">{chessCodes[color][type]}</span>
    );
  }
}

ChessPiece.propTypes = {
};

export default ChessPiece;
