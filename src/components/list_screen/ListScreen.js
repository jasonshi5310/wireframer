import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {Button} from 'react-materialize'

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        ifClicked: false
    }

    initialBooleans = () => {
        window.isTaskSorted = false;
        window.isStatusSorted = false;
        window.isDueDateSorted = false;
        window.currentItem = null;
    }


    setNewTime = (todoList) => {
        getFirestore().collection("todoLists").doc(todoList.id).update({
            time: Date.now()
        }).then(() => {
            console.log("New Time Set");
        }).catch((err) => {
            console.log(err);
        });
    }

    handleNameChange = (e) => {
        const list = getFirestore().collection("todoLists").doc(this.props.todoList.id);
        let value = e.target.value;
        if (value==='')
            value = 'unknown';
        list.update({
            name: value
        })
    }

    handleOwnerChange = (e) => {
        const list = getFirestore().collection("todoLists").doc(this.props.todoList.id);
        let value = e.target.value;
        if (value==='')
            value = 'unknown';
        list.update({
            owner: value
        })
    }

    showDeleteListDialog = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_out");
        deleteListDialog.classList.add("list_dialog_slide_in");
        deleteListDialog.hidden = false;
    }
    closeDeleteDialog = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_in");
        deleteListDialog.classList.add("list_dialog_slide_out");
        window.setTimeout(() => (deleteListDialog.hidden = true), 500);
    }

    deleteList = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_in");
        deleteListDialog.classList.add("list_dialog_slide_out");
       // this.props.delList();
        getFirestore().collection("todoLists").doc(this.props.todoList.id).delete();
        window.setTimeout(() => this.props.history.goBack(), 500);
        window.setTimeout(() => (deleteListDialog.hidden = true), 500);

    }


    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;

        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        // if(!todoList){
	    //     return <React.Fragment />
        // }
        // if (!this.state.ifClicked){
        //     this.setNewTime(todoList);
        //     this.initialBooleans();
        //     this.setState(state => ({
        //         ...state,
        //         ifClicked: true,
        //     }));
        // }
        return (
            <div className="row">
                <div className="col s2 grey lighten-2">
                <span>
                    <i className="material-icons">zoom_in</i>
                    <i className="material-icons">zoom_out</i>
                    <Button className="btn-small">Save</Button>
                    <Button className="btn-small">Close</Button>
                </span>
                <br></br>
                <br></br>
                <textarea className="white"rows="4" cols="50" disabled></textarea>
                <br></br>
                <br></br>
                <div style={{textAlign:"center"}}>Container</div>
                <br></br>
                <br></br>
                <br></br>
                <div style={{textAlign:"center"}}>Prompt for Input:</div>
                <div style={{textAlign:"center"}}>Label</div>
                <br></br>
                <br></br>
                <br></br>
                <div style={{textAlign:"center"}}>
                    <button style={{textAlign:"center"}}>Submit</button>
                </div>
                <br></br>
                <div style={{textAlign:"center"}}>Button</div>
                <br></br>
                <br></br>
                <br></br>
                <div className="input-field">
                    <label style={{color:"darkgrey"}}>Input</label>
                    <input disabled/>
                </div> 
                <div style={{textAlign:"center"}}>Textfield</div>
                <br></br>
                <br></br>
                <br></br>
                </div>
                <div className='col s8'>diagram</div>
                <div className='col s2'>property</div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList) { todoList.id = id; }
  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);