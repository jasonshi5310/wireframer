import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {
    render() {
        console.log(this.props.wireframes);
        // return (
        //     <div className="todo-lists section">
        //             {todoLists && todoLists.map(todoList => (
        //                 <span>
        //                 <Link to={'/todoList/' + todoList.id} key={todoList.id}>
        //                     <TodoListCard todoList={todoList} />
        //                 </Link>
        //                 <span>X</span>
        //                 </span>
        //         ))}
        //     </div>
        // );
        return (
            <div className="todo-lists section">
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};

export default compose(connect(mapStateToProps))(TodoListLinks);