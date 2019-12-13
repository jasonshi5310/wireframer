import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect, getFirebase } from 'react-redux-firebase';
import WireframeLinks from './WireframeLinks'
import { getFirestore } from 'redux-firestore';
import firebase from 'firebase/app';

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
        console.log("uid:"+firebase.auth().currentUser.uid)
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
                        <WireframeLinks wireframes={window.wireframes}></WireframeLinks>
                    </div>

                    <div className="col s8" style={{textAlign:"center"}}>
                        <div className="banner" id="naa" style={{textAlign:"center", borderRadius:0}}>
                        <br></br>
                        <span className="black-text">Wireframer<sup>TM</sup></span>
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