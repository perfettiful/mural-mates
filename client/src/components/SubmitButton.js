import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const SubmitButton = (props) => (
  <FlatButton label="Submit" onClick={props.onClick} />
);

export default SubmitButton;
