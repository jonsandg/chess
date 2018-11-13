import React from 'react';

import SignIn from 'components/SignIn';
import Register from 'components/Register';

const initialState = {
      username: '',
      password: '',
      confirmPassword: '',
      usernameValidation: null,
      passwordValidation: null,
      passwordConfirmValidation: null,
};

class SignInHandler extends React.Component {
  
  constructor(props, context) {
    super(props, context);
    this.state = initialState;
  }
  
  render() {
    
    let view;
    
    switch (this.props.view) {
      case 'signin':
        view = (<SignIn toggle={() => this.toggleView()}
                        submit={(e) => this.submitSignIn(e)}
                        feedback={[this.state.usernameValidation, this.state.passwordValidation]}
                        update={(e, f) => this.inputUpdate(e, f)}/>);
        break;
      case 'register':
        view = (<Register toggle={() => this.toggleView()}
                          submit={(e) => this.submitRegister(e)}
                          feedback={[this.state.usernameValidation, this.state.passwordValidation, this.state.passwordConfirmValidation]}
                          update={(e, f) => this.inputUpdate(e, f)}/>);
        break;
    }
    
    return view;
  }
    
  toggleView() {
    console.log('toggle btn clicked');
    this.state = initialState;
    this.props.toggle();
  }

  inputUpdate(event, field) {
    const value = event.target.value;
    
    switch (field) {
      case 'username':
        this.setState({username: value});
        break;
      case 'password':
        this.setState({password: value});
        break;
      case 'confirmPassword':
        this.setState({confirmPassword: value});
        break;
    }
  }

  submitSignIn(event) {
    event.preventDefault();
    let success = true;
    
    if(this.state.username === '') {
      success = false;
      this.setState({usernameValidation: 'error'});
    } else
      this.setState({usernameValidation: null});
    
    if(this.state.password === '') {
      success = false;
      this.setState({passwordValidation: 'error'});
    } else
      this.setState({passwordValidation: null});
    
    if(success) {
      this.props.submit(this.state.username, this.state.password);
    }
    
  }

  submitRegister(event) {
    event.preventDefault();
    let success = true;
    
    if(this.state.username === '') {
      success = false;
      this.setState({usernameValidation: 'error'});
    } else
      this.setState({usernameValidation: null});
    
    if(this.state.password === '') {
      success = false;
      this.setState({passwordValidation: 'error'});
    } else
      this.setState({passwordValidation: null});
    
    if(this.state.confirmPassword !== this.state.password || this.state.confirmPassword === '') {
      success = false;
      this.setState({passwordConfirmValidation: 'error'});
    } else
      this.setState({passwordConfirmValidation: null});
    
    if(success) {
      this.props.submit(this.state.username, this.state.password);
    }
  }
};

export default SignInHandler;