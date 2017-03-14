import React from 'react';

import { Panel, Button, Row, Col, Label, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router';

class GameStatus extends React.Component {

  render() {
  
                                                                          
    return (
      <div style={{textAlign: 'center',
                     margin: '50px'}}>
        <Row >
          <Col xs={4}>
            {this.props.white ? name(this.props.white, 'White', 'default') : (<Button bsSize="small" onClick={this.props.join}>Join as white</Button>)}
          </Col>
          <Col xs={4}>
            <span className="h2">Turn: {this.props.turn}</span>
          </Col>
          <Col xs={4}>
            {this.props.black ? name(this.props.black, 'Black', 'primary') : (<Button bsSize="small" onClick={this.props.join}>Join as black</Button>)}
          </Col>
        </Row>
        <Row>
          <span className="h2">{this.props.message}</span>
        </Row>
      </div>
    );
  }


};

const name = (name, color, style) => {
  return (
    <div>
    <span className="h2">{name}</span><Label bsStyle={style}>{color}</Label>
    </div>
  );
};

export default GameStatus;