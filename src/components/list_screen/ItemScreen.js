import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemScreen extends React.Component {

    loadList = () => {
        this.props.history.goBack();
        window.currentIndex = -1;
    }

    submitNewItem = () => {
        let description = document.getElementById("item_description_textfield").value;
        let assignedTo = document.getElementById("item_assigned_to_textfield").value;
        let dueDate = document.getElementById("item_due_date_picker").value;
        let completed = document.getElementById("item_completed_checkbox").checked;
        if (description === "") description = "unknown";
        if (assignedTo === '') assignedTo = "unknown";
        if (dueDate === '') dueDate = null; 
        let listID = window.currentList.id;
        let currentIndex = window.currentIndex;
        getFirestore().collection('todoLists').doc(listID).get().then(function(doc){
            let items = doc.data().items;
            if (currentIndex===-1) // add a new item
            {
                let todoItem =  {
                    "key": items.length+1,
                    "description": description,
                    "due_date": dueDate,
                    "assigned_to": assignedTo,
                    "completed": completed
                };
                items.push(todoItem);
            }
            else // edit a item
            {
                // Need to get the ref of the item
                //console.log(items[currentIndex])
                items[currentIndex].description = description;
                items[currentIndex].assigned_to = assignedTo;
                items[currentIndex].due_date = dueDate;
                items[currentIndex].completed = completed;
            }
            getFirestore().collection("todoLists").doc(listID).update({
                items:items
            })
        })
        this.props.history.goBack();
        window.currentIndex = -1;
    }

    loadItem = () => {
        let currentIndex = this.props.location.state.currentIndex;
        let currentList = this.props.location.state.currentList;
        if (currentIndex!==-1){
            let item = currentList.items[currentIndex];
            let description = document.getElementById("item_description_textfield");
            let assignedTo = document.getElementById("item_assigned_to_textfield");
            let dueDate = document.getElementById("item_due_date_picker");
            let completed = document.getElementById("item_completed_checkbox");
            description.value = item.description;
            assignedTo.value = item.assigned_to;
            dueDate.value = item.due_date;
            completed.checked = item.completed;
        }
    }

    loadDescription = () => {
                
        console.log("description")
        let currentIndex = this.props.location.state.currentIndex;
        let currentList = this.props.location.state.currentList;
        if (currentIndex!==-1){
            let item = currentList.items[currentIndex];
            return item.description;
        }
        else return "unknown";
    }

    loadAssignedTo = () => {
        console.log("assigned_to")
        let currentIndex = this.props.location.state.currentIndex;
        let currentList = this.props.location.state.currentList;
        if (currentIndex!==-1){
            let item = currentList.items[currentIndex];
            return item.assigned_to;
        }
        else return "unknown";
    }

    loadDueDate = () => {
        console.log("duedate")
        let currentIndex = this.props.location.state.currentIndex;
        let currentList = this.props.location.state.currentList;
        if (currentIndex!==-1){
            let item = currentList.items[currentIndex];
            return item.due_date;
        }
        else return null;
    }

    loadStatus = () => {
        console.log("status")
        let currentIndex = this.props.location.state.currentIndex;
        let currentList = this.props.location.state.currentList;
        if (currentIndex!==-1){
            let item = currentList.items[currentIndex];
            return item.completed;
        }
        else return false;
    }

    render() {
        return (
            <div id="add_new_item_page">
            <div id="add_new_item_dialog">
                <div className = "add_new_item_header">
                    <span>Item</span>
                </div>
                <br/>
                <br/>
                <div className = "add_new_item_header">
                    <span id= "item_description_prompt">Description:</span>
                    <input type="text" id="item_description_textfield" defaultValue={this.loadDescription()}/>
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id = "item_assigned_to_prompt">Assigned To:</span>
                    <input type="text" id="item_assigned_to_textfield" defaultValue={this.loadAssignedTo()}/>
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id="item_due_date_prompt">Due Date:</span>
                    <input type="date" id="item_due_date_picker" defaultValue= {this.loadDueDate()}/>
                </div>
                <br/>
                <div className = "add_new_item_header">
                    <span id= "item_completed_prompt">Completed:</span>
                    <label id ='item_completed_label'><input type="checkbox" id='item_completed_checkbox'
                    defaultChecked={this.loadStatus()}/>
                    <span></span></label>
                </div>
                <br/>
                <button id="item_form_submit_button"
                onClick={this.submitNewItem}
                >Submit</button>
                <button id="item_form_cancel_button"
                onClick={this.loadList}
                >Cancel</button>
            </div>
            </div> 
        )
    }
}


export default ItemScreen