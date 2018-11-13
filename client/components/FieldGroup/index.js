//https://react-bootstrap.github.io/components.html#forms
import React from 'react';

import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';

function FieldGroup({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default FieldGroup;