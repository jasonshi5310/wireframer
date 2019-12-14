import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

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
        if(!todoList){
	        return <React.Fragment />
        }
        if (!this.state.ifClicked){
            this.setNewTime(todoList);
            this.initialBooleans();
            this.setState(state => ({
                ...state,
                ifClicked: true,
            }));
        }
        return (
            <div className="container white">
                <h5 className="grey-text text-darken-3">Todo List</h5>
                <div id="list_trash" style={{top:"10%"}} onClick={this.showDeleteListDialog}>&#128465;</div>
                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleNameChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleOwnerChange} defaultValue={todoList.owner} />
                </div>

                <div className="list_item_header_card">
                <div className="list_item_task_header"
                onClick={() =>this.sortItems("task",this.props.todoList.id)}
                >
                    Task</div>
                <div className="list_item_due_date_header"
                onClick={() =>this.sortItems("due_date", this.props.todoList.id)}
                >
                    Due Date</div>
                <div className="list_item_status_header"
                onClick={() => this.sortItems("status", this.props.todoList.id)}
                >
                    Status</div>
                </div>
                {/* <ItemsList todoList={todoList} history={this.props.history}/> */}
            </div>
        );
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