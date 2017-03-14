import React from 'react';

import { Grid, Row, Col, Button } from 'react-bootstrap';
import SignInHandler from 'containers/SignInHandler';
import Loading from 'components/Loading';

import SideProfile from 'containers/SideProfile';

import { branch } from 'baobab-react/higher-order';

import * as actions from './actions';



class Sidemenu extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    
    console.log('sidemenu constructor loaded');
    this.props.dispatch(
      actions.trySignIn
    );
  }
  
  render() {
    
    let view;
    
    switch (this.props.view) {
      case 'signin':
        view = (<SignInHandler view="signin" 
                               toggle={() => this.toggleView()} 
                               submit={(u, p) => this.signInOrRegister(u, p, 'signin')}/>);
        break;
      case 'register':
        view = (<SignInHandler view="register" 
                               toggle={() => this.toggleView()} 
                               submit={(u, p) => this.signInOrRegister(u, p, 'register')}/>);
        break;
      case 'loading':
        view = (<Loading style={{marginTop: '30px'}}/>);
        break;
      case 'loggedin':
        view = (<SideProfile signout={() => this.signOut()} />);
        break;
    }
    
    return (
        <Row>
          {view}
        </Row>
    );
  }
    
  toggleView() {
    console.log('toggle btn clicked');
    const view = this.props.view === 'signin' ? 'register' : 'signin';
    this.props.dispatch(
      actions.setView,
      view
    );
  }

  signInOrRegister(username, password, type) {
    
    this.props.dispatch(
      actions.submitSignIn,
      username,
      password,
      type
    );
  }

  signOut() {
    console.log('signin out');
    this.props.dispatch(
      actions.signout
    );
  }


};

export default branch({
  view: ['sidemenu']
}, Sidemenu);;