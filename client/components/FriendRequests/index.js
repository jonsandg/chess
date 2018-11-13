import React from 'react';

import { Panel, Button, Row, Col, Badge, ListGroup, ListGroupItem } from 'react-bootstrap';


class FriendRequests extends React.Component {
  
  constructor(...args) {
    super(...args);
    this.state = {open : false};
    this.renderRequest = this.renderRequest.bind(this);
  }
  
  render() {

    return (
      <div>
        <Row onClick={ ()=> this.setState({ open: !this.state.open })}>
          <Col xs={7}>
            <span style={{fontSize : '14px'}}>Friend Requests</span>
          </Col>
          <Col xs={1}>
            <Badge>{this.props.requests.length}</Badge>
          </Col>
          <Col xs={2}>
            <i className="fa fa-angle-down" />
          </Col>
          <Col xs={2} />
        </Row>
        <Panel collapsible expanded={this.state.open}>
          <ListGroup fill>
            {this.props.requests.map(this.renderRequest)}
          </ListGroup>
        </Panel>
      </div>
    );
  }
  
  renderRequest(username) {
    
    return (
      <ListGroupItem key={username}>
        <Row>
          <Col xs={7}>{username}</Col>
          <Col xs={2}><i className="fa fa-check" onClick={() => this.props.accept(username)} /></Col>
          <Col xs={2}><i className="fa fa-times" onClick={() => this.props.decline(username)} /></Col>
          <Col xs={1}></Col>
        </Row>
      </ListGroupItem>
    );  
  }

};

export default FriendRequests;