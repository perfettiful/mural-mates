import React from "react";
import firebase from '../../Firebase'; // <--- add this line


//Image Slicer component to chop off top half of image
const FirebaseAdd = (props) => {
    console.log("props", props);

    //props.location tells which folder to put item in (i.e. completedGames.....)
    props.location
    let location = firebase.database().ref(props.location);

    //props.data
    let newItem = {};
    newItem.props.data = props.data;

    itemsRef.push(item);

}

export default FirebaseAdd;
