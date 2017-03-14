import React from 'react';

import { Grid, Row, Col, Button, Label, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Loading from 'components/Loading';
import GameList from 'components/GameList';
import {Link} from 'react-router';


import { branch } from 'baobab-react/higher-order';

import * as actions from './actions';

class StartPage extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    
    
    this.props.dispatch(
      actions.getGames
    ); 
  }

  
  render() {
    
    console.log(this.props.games);

    return (
        <div style={{padding: '50px'}}>
          <Row>
              <h2>Active Games</h2>
          </Row>
          <Row style={{marginTop: '50px'}}>
            <Col xs={6}>
              <GameList header="Waiting for players"
                        bsStyle="primary"
                        games={this.props.games.waiting} />
            </Col>
            <Col xs={6}>
              <GameList header="Active games"
                        bsStyle="primary"
                        games={this.props.games.playing} />
            </Col>
          </Row>
        </div>
    );
     
  }
            
              
  createGame() {
 
  }

};

export default branch({
  games: ['activeGames']
}, StartPage);;