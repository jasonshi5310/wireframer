import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import {Button, Icon} from 'react-materialize';

class ItemsList extends React.Component {

    addNewItem = () => {
        console.log("add new item");
        window.currentList = this.props.todoList;
        this.props.history.push({
            pathname: "ItemScreen",
            state :{
                currentList: null,
                currentIndex: -1
            }
        });
    }

    render() {
        const todoList = this.props.todoList;
        const items = this.props.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map((item) => {
                    item.id = item.key;
                    let index = items.indexOf(item);
                    //let history = this.props.history;
                    return (
                        <ItemCard item={item} index={index} 
                        />
                    );})
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
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
)(ItemsList);