import React from 'react';

import { Panel, Button, Row, Col, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

class GameList extends React.Component {

  
  renderGames(games) {
    let list = [];
    games.forEach((game, idx) => {
      const item = (
        <ListGroupItem key={idx}>
          <Link to={'/game/'+game.gameID }>{game.title}</Link>
        </ListGroupItem>
      );
      list.push(item);
    });
    return list;
  }
  
  render() {
                                                                  
    return (
      <Panel header={this.props.header} bsStyle={this.props.bsStyle}>
        <ListGroup fill>
          {this.renderGames(this.props.games)}
        </ListGroup>
      </Panel>
    );
  }


};


export default GameList;