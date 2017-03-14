 import React from 'react';

import { Panel, Button, Row, Col, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

class FriendList extends React.Component {

  render() {

    return (
      <div>
        <h5>Friends</h5>
        <ListGroup>
          {this.props.friends.map(this.renderFriend)}
        </ListGroup>
      </div>
    );
  }
  
  renderFriend(user) {
    
    return (
      <ListGroupItem key={user.name}>
        <Row>
          <Col xs={7}>
            <Link to={`/profile/${user.name}`}>{user.name}</Link>
          </Col>
          <Col xs={5}>
            <Button bsSize="small" bsStyle="primary" onClick={() => this.props.openChat(user.name)}>
            Chat
            </Button>
          </Col>
          
        </Row>
      </ListGroupItem>
    );  
  }

};

export default FriendList;