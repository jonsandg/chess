import React from 'react';

import { Panel, Button, Row, Col, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

class MessageList extends React.Component {

  render() {

    return (
      <div>
        <ul className="message-list">
          {this.props.messages.map(this.renderMessage)}
        </ul>
      </div>
    );
  }
  
  renderMessage(message) {
    
    return (
      <li className="message" key={message._id}>
        <div>
          <Label>
            <Link to={'/profile/' + message.from}>{message.from}</Link>
          </Label>
        </div>
        <span>{message.message}</span>
      </li>
    );  
  }

};

export default MessageList;