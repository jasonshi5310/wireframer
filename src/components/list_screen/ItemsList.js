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
        const items = todoList.items;
        const history = this.props.history;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    let index = items.indexOf(item);
                    //let history = this.props.history;
                    return (
                        <ItemCard todoList={todoList} item={item} index={index} 
                        history = {history}
                        isLast = {index===items.length-1} isFirst = {index===0}
                        />
                    );})
                }
                <center className="list_item_card">
                <Button floating icon={<Icon children="add"/>} onClick={() => this.addNewItem()}/>
                </center>
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