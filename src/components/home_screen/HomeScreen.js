import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';

class HomeScreen extends Component {
    handleNewList = () => 
    {
        // Create a new list
        const newList = getFirestore().collection("todoLists").doc();
        newList.set({
            name: "unknown",
            owner: "unknown",
            items: [],
            time: Date.UTC(2077,3,16,19,32,11)
        })

        this.props.history.push({
            pathname: "todoList/"+newList.id,
            key: newList.id
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        // var users = window.db.collection("users");
        // // var users = state.firestore.ordered.users;
        // console.log("Email "+window.email)
        
        // users.get().then(function(querySnapshot) {
        //     querySnapshot.forEach(function(doc) {
        //         // doc.data() is never undefined for query doc snapshots
        //         console.log(doc.id, " => ", doc.data().email);
        //         if (doc.data().email === window.email)
        //         {
        //             //console.log("dound")
        //             window.userID = doc.id;
        //             //console.log("dountID"+window.userID)
        //             window.userData = doc.data();
        //             window.wireframes = doc.data().wireframes;
        //         }
                
        //     });
        // })
        // console.log("ID"+window.userID);
        // const wireframes = window.wireframes;
        // Object.keys(wireframes).map(function(key) {
        //     console.log(wireframes[key])
        //   });

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <br></br>
                        <br></br>
                    <h5>Recent Work</h5>
                        <TodoListLinks wireframes={window.wireframes}></TodoListLinks>
                    </div>

                    <div className="col s8" style={{textAlign:"center"}}>
                        <div className="banner" id="naa" style={{textAlign:"center", borderRadius:0}}>
                        <br></br>
                        <span class="black-text">Wireframer<sup>TM</sup></span>
                        </div>
                        <br></br>
                        <h4 className="home_new_list_container">
                                <button className="home_new_list_button" onClick={this.handleNewList}>
                                    Create New Wireframe
                                </button>
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy:['time', 'desc'] },
    ]),
)(HomeScreen);