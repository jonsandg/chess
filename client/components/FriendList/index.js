 import React from 'react';

import { Panel, Button, Row, Col, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

class FriendList extends React.Component {

  render() {

    return (
      <div>
        <h5>Friends</h5>
        <ListGroup>
          {this.props.friends.map(val => this.renderFriend(val, (user) => this.props.openChat(user)))}
        </ListGroup>
      </div>
    );
  }
  
  renderFriend(user, click) {
    
    return (
      <ListGroupItem key={user.name}>
        <Row>
          <Col xs={7}>
            <Link to={`/profile/${user.name}`}>{user.name}</Link>
          </Col>
          <Col xs={5}>
            <Button bsSize="small" bsStyle="primary" onClick={() => click(user.name)}>
            Chat
            </Button>
          </Col>
          
        </Row>
      </ListGroupItem>
    );  
  }

};

export default FriendList;