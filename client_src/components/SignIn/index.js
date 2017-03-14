import React from 'react';

import { Grid, Row, Col, Button } from 'react-bootstrap';

import FieldGroup from 'components/FieldGroup';

function SignIn ({ toggle, submit, feedback, update, ...props}) {
  return (
    <form onSubmit={submit}>
      <FieldGroup
        id="formUsername"
        type="text"
        label="Username"
        placeholder="Username"
        validationState={feedback[0]}
        onChange={(e) => update(e, 'username')}
      />
      <FieldGroup
        id="formPassword"
        label="Password"
        type="password"
        placeholder="********"
        validationState={feedback[1]}
        onChange={(e) => update(e, 'password')}
      />
      <Button type="submit" bsStyle="primary" bsSize="small">
        Log in
      </Button>
      <Button bsStyle="info" bsSize="small" style={{float: 'right'}} onClick={toggle}>
        Sign up
      </Button>
    </form>
  );
};

export default SignIn;
