import React from "react";
import {Message} from "semantic-ui-react";

// The Math function component accepts a props argument
const Counter = (props) => {
    const styles={
        color:"red",
        fontWeight:"bold",

    }
    let value = 0;
    // Assign value based on the operator
   
    props.seenCounter.map(count => (
        count.p1seen ? value = value : value++
    ));

    if (value === 1) {
        return  <h2>You Have {value} New Completed Mural(s) to Check Out! </h2>;
    } else if (value > 1) {
        return  <h2>You Have {value} New Completed Mural(s) to Check Out! </h2>;
    } else {
        return null;
    }

};

export default Counter;
