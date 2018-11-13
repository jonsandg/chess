"use strict";
import React from 'react';

import { Grid, Row, Col, Button, Label, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Loading from 'components/Loading';
import ChessBoard from 'components/ChessBoard';
import CapturedPieces from 'components/CapturedPieces';
import GameStatus from 'components/GameStatus';

import { branch } from 'baobab-react/higher-order';

import * as actions from './actions';
import * as chatActions from 'containers/Chatmenu/actions';


class Game extends React.Component {
  
  constructor(...args) {
    super(...args);
    this.props.dispatch(
      actions.getGame,
      this.props.params.gameID
    );
    
    this.props.dispatch(
      chatActions.getGameChat,
      this.props.params.gameID
    );

  }
  
  componentWillReceiveProps(nextProps) {

    if(nextProps.params.gameID !== this.props.params.gameID || nextProps.user !== this.props.user) {
      this.props.dispatch(
        actions.getGame,
        nextProps.params.gameID
      );
      
      this.props.dispatch(
      chatActions.getGameChat,
      this.props.params.gameID
    );
    }
    
    
  }
  
  render() {
    
    switch(this.props.game.view) {
      case 'loading':
        return <Loading />;
      case 'error':
        return <h2>No game with that ID</h2>;
      case 'game':
        return (
          <div>
            <GameStatus white={this.props.game.white}
                        black={this.props.game.black}
                        turn={this.props.game.turn}
                        message={this.props.game.message}
                        join={() => this.joinGame()}/>
            <Row>
              <Col xs={2}>
                <CapturedPieces pieces={this.props.game.captured.filter(val => {return val.color === 'w'})} />
              </Col>
              <Col xs={8}>
                <ChessBoard positions={this.props.game.board} 
                            possibleMoves={this.props.game.possibleMoves}
                            whitePlayer={this.props.game.isWhite}
                            onSquareClick={(i, j) => this.clickSquare(i, j)}/>
              </Col>
              <Col xs={2}>
                <CapturedPieces pieces={this.props.game.captured.filter(val => {return val.color === 'b'})} />
              </Col>
            </Row>
          </div>
        );
    }
  }
  
  clickSquare(i, j) {
    console.log('clicking');
    if(!this.props.game.isPlayer) return;
    console.log('is player!');
    if(this.props.game.status !== 'started') return;
    console.log('game started!');
    if(!(this.props.game.isWhiteTurn === this.props.game.isWhite)) return;
    console.log('did not get here');
    console.log('i', i);
    console.log('j', j);

    
    this.props.dispatch(
      actions.click,
      i,
      j
    );
  }

  joinGame() {
    this.props.dispatch(
      actions.joinGame,
      this.props.params.gameID
    );
  }

};

export default branch({
  game: ['game'],
  user: ['user', 'name']
}, Game);;