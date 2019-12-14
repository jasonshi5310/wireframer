import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WireframeCard from './WireframeCard';
import { getFirestore } from 'redux-firestore';
import firebase from 'firebase/app';


class WireframeLinks extends React.Component {
    render() {
        const wireframeList = document.getElementById('wireframeList');
        console.log(wireframeList);

        function renderLinks(doc) {
            var showDeleteListDialog = () => {
                let deleteListDialog = document.getElementById("list_delete_confirmation");
                deleteListDialog.classList.remove("list_dialog_slide_out");
                deleteListDialog.classList.add("list_dialog_slide_in");
                deleteListDialog.hidden = false;
            }

            let li = document.createElement("div");
            let name = document.createElement("span");
            let x = document.createElement("span");

            x.textContent = 'X';
            x.classList.add("right");
            x.addEventListener("click", showDeleteListDialog)
            name.textContent = doc;
            name.classList.add("blueUS");

            li.appendChild(name);
            li.appendChild(x);

            if (wireframeList!== null)
                wireframeList.appendChild(li);

        }

        const uid = firebase.auth().currentUser.uid;
        //console.log("uid:"+uid)
        window.db.collection("users").doc(uid).get().then((doc)=> {
            doc.data().wireframes.forEach(element => {
                //console.log(element.name);
                renderLinks(element.name);
            });
        });
        //console.log(this.props.wireframes);
        // return (
        //     <div className="todo-lists section">
        //             {todoLists && todoLists.map(todoList => (
        //                 <span>
        //                 <Link to={'/todoList/' + todoList.id} key={todoList.id}>
        //                     <WireframeCard todoList={todoList} />
        //                 </Link>
        //                 <span>X</span>
        //                 </span>
        //         ))}
        //     </div>
        // );
        return (
            <div></div>
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