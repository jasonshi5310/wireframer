import React from 'react'
import { connect } from 'react-redux';
import todoJson from './TestTodoListData.json'
import { getFirestore } from 'redux-firestore';
import firebase from 'firebase/app';

class DatabaseTester extends React.Component {

    // NOTE, BY KEEPING THE DATABASE PUBLIC YOU CAN
    // DO THIS ANY TIME YOU LIKE WITHOUT HAVING
    // TO LOG IN
    handleClear = () => {
        console.log("cleared")
        const fireStore = getFirestore();
        let uid = firebase.auth().currentUser.uid;
        getFirestore().collection('users').doc(uid).get().then(
            function (doc) {
                let email = doc.data().email;
                fireStore.collection('todoLists').get().then(function(querySnapshot){
                querySnapshot.forEach(function(doc) {
                if (doc.data().email===email)
                {console.log("deleting " + doc.id);
                fireStore.collection('todoLists').doc(doc.id).delete();}
            }) 
            }
        );
    })
        // fireStore.collection('todoLists').get().then(function(querySnapshot){
        //     querySnapshot.forEach(function(doc) {
        //         console.log("deleting " + doc.id);
        //         let uid = firebase.auth().currentUser.uid;
        //         getFirestore.collection('users').doc(uid).get().then
        //         fireStore.collection('todoLists').doc(doc.id).delete();
        //     })
        // });
}

    handleReset = () => {
        const fireStore = getFirestore();
        let uid = firebase.auth().currentUser.uid;
        getFirestore().collection('users').doc(uid).get().then(
            function (doc) {
                let email = doc.data().email;
                todoJson.todoLists.forEach(todoListJson => {
                    if (todoListJson.email===email)
                    {
                        fireStore.collection('todoLists').add({
                            name: todoListJson.name,
                            email: todoListJson.email,
                            items: todoListJson.items,
                            width: todoListJson.width,
                            height: todoListJson.height,
                            time: Date.now()
                        }).then(() => {
                            console.log("DATABASE RESET");
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                });
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handleClear}>Clear Database</button>
                <button onClick={this.handleReset}>Reset Database</button>
            </div>)
    }
}

const mapStateToProps = function (state) {
    return {
        auth: state.firebase.auth,
        firebase: state.firebase
    };
}

export default connect(mapStateToProps)(DatabaseTester);