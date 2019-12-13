import React from 'react';

class WireframeCard extends React.Component {

    render() {
        const { todoList } = this.props;
        //console.log("TodoListCard, todoList.id: " + todoList.id);
        return (
            <div className="card z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default WireframeCard;