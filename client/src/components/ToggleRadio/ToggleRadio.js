import React, { Component } from "react";
import { Radio } from "semantic-ui-react";
//Radio button that sets murals to private mode
const ToggleRadio = props => (
    <Radio toggle className="radio" {...props}/>
  );
export default ToggleRadio;
