import React from 'react';
import {Button, Icon} from 'react-materialize';
import {getFirestore} from 'redux-firestore';
import { Rnd } from 'react-rnd';

class ItemCard extends React.Component {

    removeItem = (event) => {
        event.stopPropagation();
        console.log(this.props.index);
        let index = this.props.index;
        let listID = this.props.todoList.id;
        getFirestore().collection("todoLists").doc(listID).get().then(function(doc) {
            let items = doc.data().items;
            items.splice(index,1);
            getFirestore().collection("todoLists").doc(listID).update({
                items:items
            })
        });


    }

    editItem = () => {
        console.log("edit item");
        window.currentList = this.props.todoList;
        window.currentIndex = this.props.index;
        this.props.history.push({
            pathname: "ItemScreen",
            state :{
                currentList: window.currentList,
                currentIndex: window.currentIndex
            }
        });
    }

    renderElement = (item) => {
        //return (<input defaultValue={item.type}></input>)
        if (item.type === 'textfield')
        {
            //let i = document.createElement('input');
            //return i;
            return (<input value=''
            style = {{color:'black',
            width: '100%',
            height:'100%'
            }}></input>)
        }
        else if (item.type === 'label')
        {
            // let l = document.createElement('label');
            // l.innerHTML = item.defaultValue;
            // l.style.color = 'black';
            //let text = item.defaultValue;
            //return l;
            return (<label
            style = {{color:'black',
                width: '100%',
                height:'100%'
        }}
            >{item.defaultValue}</label>)
        }
        else if (item.type === 'container')
        {
            // let c = document.createElement('div');
            // c.style.border = 'solid';
            //return c;
            return (<div 
            style = {{border:'solid',
                width: '100%',
                height: '100%'
        }}
            ></div>)
        }
        if (item.type === 'button')
        {
            // let b = document.createElement('button');
            // b.innerHTML = item.text;
            // return b;
            return (<button
            style = {{
                width: '100%',
                height : '100%'
            }}
            >{item.defaultValue}</button>)
        }
        return (<div>Error</div>)
    }

    render() {
        const { item } = this.props;
        return (
            <Rnd
            default={{
                x: item.x,
                y: item.y,
                width: item.width,
                height: item.height,
              }}
              //onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
            //   onResizeStop={(e, direction, ref, delta, position) => {
            //     this.setState({
            //       width: ref.style.width,
            //       height: ref.style.height,
            //       ...position,
            //     });
            //   }}
              
              bounds = "#canvas"
              minHeight = {50}
              minWidth = {50}
            >
                {this.renderElement(item)}
            </Rnd>
            
        );
    }
}
export default ItemCard;