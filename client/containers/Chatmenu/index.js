import React from 'react';
import { branch } from 'baobab-react/higher-order';
import { Grid, Row, Col, Label, Badge, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import {Link} from 'react-router';

import MessageList from 'components/MessageList';
import ChatView from 'react-chatview';
import * as actions from './actions';

class Chatmenu extends React.Component {
  
  constructor(...args){
    super(...args);
    this.state = {message: ''};
    
    this.props.dispatch(
      actions.getGeneralChat
    );
  }
  
  render() {
    
    return (
      <div>
        <Row>
          
            <ChatView flipped={true} 
                      scrollLoadThreshold={50} 
                      onInfiniteLoad={() => {}}
                      className="message-list">
              {this.renderMessages()}
            </ChatView>

        </Row>

        <Row className='chat-control'>
          <Row>
            <FormGroup bsSize="small">
              <InputGroup>
                <FormControl onChange={(e) => this.messageChange(e)} bsSize="small" type="text" placeholder="Message" value={this.state.message} />
                <InputGroup.Button>
                  <Button bsSize="small" bsStyle="primary" onClick={() => this.sendMessage()}>Send</Button>
                </InputGroup.Button>
              </InputGroup>
            </FormGroup>
          </Row>
                  
          <Row className="chat-list">
            {this.renderChatList()}
          </Row>
        </Row>
      </div>
    );
  }
  
  messageChange(e) {
    this.setState({message: e.target.value});
  }

  sendMessage() {
    if(this.state.message !== '') {
      
      this.props.dispatch(
        actions.sendMsg,
        this.state.message,
        this.props.viewing
      );
      
      this.setState({message: ''});
    }
  }
  
  viewChat(chat) {
    this.props.dispatch(
      actions.viewChat,
      chat
    );
  }

  closeChat(chat) {
    this.props.dispatch(
      actions.closeChat,
      chat
    );
  }
  
  
  renderChatList() {
    let chats = [];
  
    
    
    chats.push(this.renderChatListItem(this.props.generalChat));
    if(this.props.game)
      chats.push(this.renderChatListItem(this.props.gameChat));
    
    this.props.privateChats.forEach(chat => {
      chats.push(this.renderChatListItem(chat));
    });
    
      
    return chats;
  }
  
  renderChatListItem(chat) {
    const isNotPrivate = chat.name === 'general' || chat.name === 'game';
    return (
      <div key={chat.name}>
        <Label bsStyle={this.props.viewing === chat.name ? "primary" : "default"}>
          {isNotPrivate ? "" : (<i onClick={() => this.closeChat(chat.name)} className="fa fa-times" style={{color: 'white'}} />)}
          <span onClick={() => this.viewChat(chat.name)} >{chat.name}</span>
        </Label>
      </div>
    );
  }
          
  renderMessages() {
    const viewing = this.props.viewing;
    if(viewing === 'game') {
      return this.props.gameChat.messages.map(this.renderMessage);
    }
    if(viewing === 'general') {
      return this.props.generalChat.messages.map(this.renderMessage);
    }
    //viewing PM
    for(let i = 0; i<this.props.privateChats.length; i++){
      if(this.props.privateChats[i].name === viewing)
        return this.props.privateChats[i].messages.map(this.renderMessage);
    }
this.props.viewing
          
  }
  
  renderMessage(message) {
    return (
      <li className="message" key={message.date}>
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


export default branch({
  viewing: ['chat', 'viewing'],
  privateChats: ['chat', 'chats', 'privates'],
  generalChat: ['chat', 'chats', 'general'],
  gameChat: ['chat', 'chats', 'game'],
  user: ['user', 'name'],
  game: ['game', 'id']
}, Chatmenu);