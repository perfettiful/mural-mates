import React from "react";
import Firebase from '../../Firebase'; // <--- add this line


//This is a somewhat generic helper component for retrieving firebase items/having those items update on the page whenever a new one is added.  
//Essential*** You need to create a function in the parent component for taking in the returned items and pass this function as a callback prop to FirebaseRetrieve 


export default class FirebaseRetrieve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            retrievedItems: []
        };
    }

    componentDidMount() {

        //Pass file location props here- also can pass a quantity props using something like: let location = Firebase.database().ref(this.props.location).limitToFirst(this.props.quantity)

        let location = Firebase.database().ref(this.props.location);

        location.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item
                });
            }
            this.setState({
                retrievedItems: newState
            });

            //Send the list of items back to the parent
            this.props.callback(this.state.retrievedItems);
        });
    }

    //This isn't really doing anything- but might be essential :-/... Needs cleanup.  
    render() {
        return (
            <div>
            </div>
        )
    }
}
