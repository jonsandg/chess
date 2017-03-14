import React from 'react';
import ChessPiece from 'components/ChessPiece';
import ChessBoard from 'components/ChessBoard';

import SignIn from 'components/SignIn';
import Register from 'components/Register';

import { Grid, Row, Col } from 'react-bootstrap';

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Chess Pieces</h2>
        <Row>
          <ChessPiece piece={{color: 'b', type: 'p'}} />
          <ChessPiece piece={{color: 'b', type: 'n'}} />
          <ChessPiece piece={{color: 'b', type: 'b'}} />
          <ChessPiece piece={{color: 'b', type: 'r'}} />
          <ChessPiece piece={{color: 'b', type: 'q'}} />
          <ChessPiece piece={{color: 'b', type: 'k'}} />
        </Row>
        <Row>
          <ChessPiece piece={{color: 'w', type: 'p'}} />
          <ChessPiece piece={{color: 'w', type: 'n'}} />
          <ChessPiece piece={{color: 'w', type: 'b'}} />
          <ChessPiece piece={{color: 'w', type: 'r'}} />
          <ChessPiece piece={{color: 'w', type: 'q'}} />
          <ChessPiece piece={{color: 'w', type: 'k'}} />
        </Row>
      </div>
        
    );
  }
});