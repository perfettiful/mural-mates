import React from "react";
import Firebase from '../../Firebase'; // <--- add this line


export default class FirebaseRetrieve extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completedGames: []
        };
    }

    componentDidMount() {
        console.log("mounted");

        //Pass file location props here- also can pass a quantity props              .limitToFirst(3)

        let location = Firebase.database().ref("completedGames");
        //Use file location props 
        location.on('value', (snapshot) => {
            let items = snapshot.val();
            console.log("items",items);
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item
                });
            }
            this.setState({
                completedGames: newState
            });

            this.props.callback(this.state.completedGames);
        });
    }

    render() {
        return (
            <div>
         

            </div>
        )
    }
}
