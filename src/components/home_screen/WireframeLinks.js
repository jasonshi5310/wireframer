import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';
import firebase from 'firebase/app';


class WireframeLinks extends React.Component {


    render() {
        let todoLists;
        if (this.props.todoLists!== undefined)
        {
            todoLists = this.props.todoLists.filter(
                function (list) {
                    return list.email === window.email;
                }
            )
        }
        const uid = firebase.auth().currentUser.uid;
        return (
            <div className="todo-lists section">
                {todoLists && todoLists.map(todoList => (
                    <div>
                    <Link to={
                        {
                        pathname: '/user/'+uid+'/wireframe/' + todoList.id,
                        }
                        } key={todoList.id}>
                        <WireframeCard todoList={todoList} id={todoList.id} />
                    </Link>
                   
                    </div>
                ))}
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

export default compose(connect(mapStateToProps))(WireframeLinks);