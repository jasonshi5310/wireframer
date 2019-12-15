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
            email:window.email,
            items: [],
            time: Date.UTC(2077,3,16,19,32,11)
        })

        const uid = firebase.auth().currentUser.uid;
        //console.log("new list id"+newList.id)

        this.props.history.push({
            pathname: "/user/"+uid+"/wireframe/"+newList.id,
            key: newList.id,
        });

    }

    deleteList = (event) => {
        event.stopPropagation();
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_in");
        deleteListDialog.classList.add("list_dialog_slide_out");
        const uid = firebase.auth().currentUser.uid;
       // this.props.delList();
        if (window.id !== undefined)
            getFirestore().collection("todoLists").doc(window.id).delete();
            window.setTimeout(() => this.props.history.push({
            pathname: "/user/"+uid,
        }), 500);
        window.setTimeout(() => (deleteListDialog.hidden = true), 500);

    }

    closeDeleteDialog = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_in");
        deleteListDialog.classList.add("list_dialog_slide_out");
        window.setTimeout(() => (deleteListDialog.hidden = true), 300);
    }

    isAdmin = () => 
    {
        let type = window.type;
        if (type==="Administrator")
            return false;
        else 
            return true;
    }

    openDataBaseTester = () => {
        window.open("http://localhost:3000/databaseTester"); 
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }
        //let uid = "r6TzTeVO36yWtHamPRZy";
        const uid = firebase.auth().currentUser.uid;
        console.log(uid)
        window.db.collection("users").doc(uid).get().then(
            function (doc) {
                //console.log(doc.data().email);
                window.email = doc.data().email;
                window.type = doc.data().accountType;
                console.log(window.type);
            }
        )

        return (
            <div className="dashboard container">
                <div id="list_delete_confirmation" hidden>
                    <div id="list_delete_confirmation_content">
                    <p className="list_delete_confirmation_message">Delete the diagram?</p>
                    <br/>
                    <p id="list_delete_confirmation_bold">Are you sure you want to delete this diagram?</p>
                    <br/>
                    <button id="list_delete_confirmation_button_yes" onClick={(event)=> this.deleteList(event)}
                    >Yes</button>
                    <button id="list_delete_confirmation_button_no" onClick={this.closeDeleteDialog}
                    >No</button>
                    <br/>
                    <p className="list_delete_confirmation_message">The diagram will not be retreivable.</p>
                </div>
                </div>
                <button id="databaseTester" hidden={this.isAdmin()} onClick={this.openDataBaseTester}>Open Test Database</button>
                <div className="row">
                    <div className="col s12 m4" id="wireframeList">
                        <br></br>
                        <br></br>
                    <h5>Recent Work</h5>
                        <WireframeLinks></WireframeLinks>
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
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy:['time', 'desc'] },
    ]),
)(HomeScreen);