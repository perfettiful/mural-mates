import React from "react";

// The Math function component accepts a props argument
const Counter = (props) => {
    let value = 0;
    // Assign value based on the operator
    props.seenCounter.map(count => (
        count.p1seen ? value = value : value++
    ));

    if (value === 1) {
        return  <h2>You Have {value} New Completed Mural to Check Out! </h2>;
    } else if (value > 1) {
        return  <h2>You Have {value} New Completed Mural to Check Out! </h2>;
    } else {
        return null;
    }

};

export default Counter;
