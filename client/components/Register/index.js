import React from 'react';

import { Grid, Row, Col, Button } from 'react-bootstrap';

import FieldGroup from 'components/FieldGroup';

function Register({ toggle, submit, feedback, update, ...props }) {

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
      <FieldGroup
        id="formConfirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="********"
        validationState={feedback[2]}
        onChange={(e) => update(e, 'confirmPassword')}
      />
      <Button type="submit" bsStyle="primary" bsSize="small">
        Submit
      </Button>
      <Button bsStyle="info" bsSize="small" style={{float: 'right'}} onClick={toggle}>
        I have an account
      </Button>
    </form>
  );
}


export default Register;