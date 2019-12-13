import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';

class TodoListLinks extends React.Component {
    render() {
        var users = window.db.collection("users");
        // var users = state.firestore.ordered.users;
        console.log("Email "+window.email)
        users.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().email);
                if (doc.data().email === window.email)
                    window.userID = doc.id;
                
            });
        })
        console.log(window.userID);
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
                    {/* {user && user.map( => (
                        <span>
                        <Link to={'/todoList/' + user.id} key={todoList.id}>
                            <TodoListCard todoList={todoList} />
                        </Link>
                        <span>X</span>
                        </span>
                ))} */}
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