import React from 'react';

class WireframeCard extends React.Component {

    showDeleteListDialog = (e) => {
        e.preventDefault();
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_out");
        deleteListDialog.classList.add("list_dialog_slide_in");
        deleteListDialog.hidden = false;
        window.id = this.props.id;
        //console.log(window.id);
    }

    render() {
        const { todoList } = this.props;
        //console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <span className="card-content">
                    <span className="card-title" className="blueUS">{todoList.name}</span>
                </span>
                <span className="right" onClick={(event)=> this.showDeleteListDialog(event)}>X</span>
            </div>
        );
    }
}
export default WireframeCard;