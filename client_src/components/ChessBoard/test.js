"use strict";

import React from 'react';
import { Badge, Label, Col, Row } from 'react-bootstrap';

import ChessSquare from 'components/ChessSquare';

class ChessBoard extends React.Component {
  
  renderSquare(i, j) {
    return <ChessSquare key={i+j} 
                        color={(i+j) % 2 === 0 ? 'white' : 'black' } 
                        piece={this.props.positions[i][j]}
                        possibleMove={this.props.possibleMoves[i][j]}/>;
  }
  
  renderRow(i) {
    let squares = [];
    for (let j = 0; j<8; j++) {
      squares.push(this.renderSquare(i, j));
    }
    return (
      <div key={i} className="chess-row">
        {squares}
        <div className="square number">
          <Label>{this.props.whitePlayer ? 8 - i : 1 + i}</Label>
        </div>
      </div>
    );
  }
  
  renderLetter(i) {
    return (
      <div key={i} className="square letter">
        <Label>{this.props.whitePlayer ? String.fromCharCode(97 + i) : String.fromCharCode(104 - i)}</Label>
      </div>
    );
  }
  
  renderLetterRow() {
    let letters = [];
    for (var i = 0; i<8; i++) {
      letters.push(this.renderLetter(i));
    }
    return (
      <div key={9} className="chess-row">
        {letters}
      </div>
    );
  }
  
  render() {
    
    let rows = [];

    for (let i = 0; i<8; i++) {
      rows.push(this.renderRow(i));
    }
    rows.push(this.renderLetterRow());  
    
    return (
      <div className="board">
        {rows}
      </div>
    );
  }
}

ChessBoard.propTypes = {
};
 
export default ChessBoard;
