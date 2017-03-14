"use strict";

import React from 'react';
import ChessPiece from 'components/ChessPiece';
import classNames from 'classnames';
import { Grid, Row, Col } from 'react-bootstrap';

class ChessSquare extends React.Component {
  render() {
    const { color } = this.props;
    const piece = this.props.piece === null ? "" : <ChessPiece piece={this.props.piece} />;
    const classes = classNames('square',
                               'chess',
                                color,
                              {'possible-move': this.props.possibleMove});
    return (
      <div className={classes} onClick={this.props.onClick}>
        {piece}
      </div>
    );
  }
}

ChessSquare.propTypes = {
};

export default ChessSquare;
