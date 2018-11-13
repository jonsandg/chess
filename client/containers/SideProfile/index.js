import React from 'react';

import { Grid, Row, Col, Button, FormGroup, FormControl, InputGroup, ControlLabel } from 'react-bootstrap';
import {Link} from 'react-router';

import Loading from 'components/Loading';
import FriendRequests from 'components/FriendRequests';
import FriendList from 'components/FriendList';

import { branch } from 'baobab-react/higher-order';

import * as actions from './actions';

const initialState = {addFriendInput: ''};

class SideProfile extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    
    //this.onFriendNameChange = this.onFriendNameChange.bind(this);
    
    this.state = initialState;
    
    this.props.dispatch(
      actions.getFriendRequests
    );
    
    this.props.dispatch(
      actions.getFriends
    );
  }
  
  render() {
    
    return (
      <div>
        <Row>
          <h2><Link to={'/profile/' + this.props.name}>{this.props.name}</Link></h2>
        </Row>
        <Row>
          <Button bsSize="small" onClick={this.props.signout}>Sign out</Button>
          <Button bsStyle="primary" bsSize="small" style={{float: 'right'}} onClick={() => this.createGame()}>
            Create game
          </Button>
        </Row>
        <Row>
          <FriendRequests accept={(u) => this.handleFriendRequest(u, true)}
                          decline={(u) => this.handleFriendRequest(u, false)}
                          requests={this.props.requests}/>
        </Row>
        <Row>
            <FormGroup bsSize="small">
              <ControlLabel>Add friend</ControlLabel>
              <InputGroup>
                <FormControl onChange={(e) => this.onFriendNameChange(e)} bsSize="small" type="text" placeholder="Username" value={this.state.addFriendInput} />
                <InputGroup.Button>
                  <Button bsSize="small" bsStyle="primary" onClick={() => this.sendFriendRequest()}>Send</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
        </Row>
        <Row>
          <FriendList friends={this.props.friends}
                      openChat={(user) => {this.openChat(user)}}/>
        </Row>
      </div>
    );
  }
  
  openChat(user) {
    this.props.dispatch(
      actions.openChat,
      user
    );
  }
  
  handleFriendRequest(username, accept) {
    const action = accept ? actions.acceptFriend : actions.declineFriend;
    this.props.dispatch(
      action,
      username
    );
  }
    
  onFriendNameChange(event) {
    this.setState({addFriendInput: event.target.value});
  }

  sendFriendRequest() {
    if(this.state.addFriendInput !== '') {
      
      this.props.dispatch(
        actions.sendFriendRequest,
        this.state.addFriendInput
      );
      this.setState(initialState);
    }
  }

  createGame() {
    this.props.dispatch(
      actions.createGame
    );
  }



};

export default branch({
  name: ['user', 'name'],
  friends: ['user', 'friends'],
  requests: ['user', 'friendRequests']
}, SideProfile);