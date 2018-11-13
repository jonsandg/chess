import React from 'react';

import { Grid, Row, Col, Button, Label, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import Loading from 'components/Loading';
import GameList from 'components/GameList';
import {Link} from 'react-router';


import { branch } from 'baobab-react/higher-order';

import * as actions from './actions';



class Profile extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    
    
    this.props.dispatch(
      actions.getUser,
      this.props.params.username
    ); 
  }

  
  render() {
  
    if(this.props.profile) {
      const areFriends = this.props.profile.areFriends;
      return (
          <div style={{padding: '50px'}}>
            <Row>
              <Col xs={8}>
                <span className="h2">{this.props.params.username}</span>
                {areFriends ? (<Label bsStyle="success">Friends</Label>) : ""}
              </Col>
              <Col xs={2}>
                <Button bsSize="small" 
                        bsStyle="primary"
                        onClick={() => this.createGame()}>Start game</Button>
              </Col>
              <Col xs={2}>
                <Button bsSize="small" bsStyle={areFriends ? "danger" : "success"}>
                  {areFriends ? "Remove friend" : "Add friend"}
                </Button>
              </Col>
            </Row>
            <Row style={{marginTop: '50px'}}>
              <Col xs={6}>
                <GameList header="Active games"
                          bsStyle="primary"
                          games={this.props.profile.games.filter(game => {return game.status !== 'finished';})} />
              </Col>
              <Col xs={6}>
                <GameList header="Past games"
                          bsStyle="primary"
                          games={this.props.profile.games.filter(game => {return game.status === 'finished';})} />
              </Col>
            </Row>
          </div>
      );
    } else {
      return (<Loading />);
    }
  }
            
              
  createGame() {
    this.props.dispatch(
      actions.createGame,
      this.props.profile.username
    );
  }

};

export default branch({
  profile: ['profile']
}, Profile);;