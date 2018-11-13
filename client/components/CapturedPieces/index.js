import React from 'react';

import { Panel, Button, Row, Col, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import ChessPiece from 'components/ChessPiece';

class CapturedPieces extends React.Component {

  render() {
    return (
      <div>
        {this.props.pieces.map((piece, idx) => {
          return <ChessPiece style={{float: 'left'}} key={idx} piece={piece} />;
        })}
      </div>
    );
  }

};

export default CapturedPieces;