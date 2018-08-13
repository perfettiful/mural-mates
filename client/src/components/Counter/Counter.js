import React from "react";

// The Math function component accepts a props argument
const Counter = (props) => {
  let value=0;
  // Assign value based on the operator
  props.seenCounter.map(count => (
    count.p1seen ? value++ : value=value
  ));
  console.log("VAL",value);
  return <span>{value}</span>;
};

export default Counter;
