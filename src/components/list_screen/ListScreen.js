import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {Button} from 'react-materialize';
import firebase from 'firebase/app';
import { Rnd } from 'react-rnd';

class ListScreen extends Component {
    state = {
        name:'',
        items: [],
        isSaved: true,
        ifClicked: false,
    }


    setNewTime = (todoList) => {
        getFirestore().collection("todoLists").doc(todoList.id).update({
            time: Date.now()
        }).then(() => {
            console.log("New Time Set");
        }).catch((err) => {
            console.log(err);
        });
    }

    handleNameChange = (e) => {
        //const {todoList} = this.props.location.state;
        let todoList = this.props.todoList;
        const list = getFirestore().collection("todoLists").doc(todoList.id);
        let value = e.target.value;
        if (value==='')
            value = 'unknown';
        list.update({
            name: value
        })
    }

    showDeleteListDialog = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_out");
        deleteListDialog.classList.add("list_dialog_slide_in");
        deleteListDialog.hidden = false;
    }
    closeDeleteDialog = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_in");
        deleteListDialog.classList.add("list_dialog_slide_out");
        window.setTimeout(() => (deleteListDialog.hidden = true), 500);
    }

    saveWorks = () => {
        console.log("save");
        if (!this.state.isSaved)
        {
            //const {todoList} = this.props.location.state;
            let todoList = this.props.todoList;
            let listID = todoList.id;
            getFirestore().collection("todoLists").doc(listID).update({
                items:this.state.items
            })
            this.setState({isSaved:true});
        }
        document.getElementById("save").disabled = true;
        
    }

    closeWorks = () => {
        console.log("close");
        if(!this.state.isSaved)
        {
            let deleteListDialog = document.getElementById("list_delete_confirmation");
            deleteListDialog.classList.remove("list_dialog_slide_out");
            deleteListDialog.classList.add("list_dialog_slide_in");
            deleteListDialog.hidden = false;
        }
        else
        {
            const uid = firebase.auth().currentUser.uid;
            this.props.history.push({
                pathname: "/user/"+uid,
            });
        }
        
    }

    addContainer = () => {
        console.log("add container");
        let items = this.state.items;
        console.log(items.length);
        let item =          
        {
            "key": items.length,
            "type": "container",
            "background": "white",
            "borderColor": "black",
            "borderThickness": "solid",
            "borderRadius": 2,
            "width": "200px",
            "height": "50px",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({items:items, 
            isSaved: false
        });
        document.getElementById("save").disabled = false;
    }

    addLabel = () => {
        console.log("add label");
        let items = this.state.items;
        console.log(items.length);
        let item =          
        {
            "key": items.length,
            "type": "label",
            "defaultValue": 'Prompt for Input',
            "background": "white",
            "borderColor": "black",
            "borderThickness": 0,
            "borderRadius": 2,
            "width": "150px",
            "height": "50px",
            "fontColor": "black",
            "fontSize":  "12",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({items:items, 
            isSaved: false});
    }

    addButton = () => {
        console.log("add button");
        let items = this.state.items;
        console.log(items.length);
        let item =          
        {
            "key": items.length,
            "type": "button",
            "defaultValue": 'Submit',
            "background": "white",
            "borderColor": "black",
            "borderThickness": "solid",
            "borderRadius": 2,
            "width": "90px",
            "height": "30px",
            "fontColor": "black",
            "fontSize":  "12",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({items:items, 
            isSaved: false});
    }

    addTextfield = () => {
        console.log('add textfield');
        let items = this.state.items;
        console.log(items.length);
        let item =          
        {
            "key": items.length,
            "type": "textfield",
            "background": "white",
            "borderColor": "black",
            "borderThickness": 0,
            "borderRadius": 2,
            "width": "150px",
            "height": "50px",
            'defaultValue':"Input",
            "fontColor": "grey",
            "fontSize":  "12",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({items:items, 
            isSaved: false});
    }

    closeDeleteDialog = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_in");
        deleteListDialog.classList.add("list_dialog_slide_out");
        window.setTimeout(() => (deleteListDialog.hidden = true), 300);
    }

    closeWithoutSaving = () => {
        let deleteListDialog = document.getElementById("list_delete_confirmation");
        deleteListDialog.classList.remove("list_dialog_slide_in");
        deleteListDialog.classList.add("list_dialog_slide_out");
        const uid = firebase.auth().currentUser.uid;
        window.setTimeout(() => this.props.history.push({
            pathname: "/user/"+uid,
        }), 500);
        window.setTimeout(() => (deleteListDialog.hidden = true), 500);
    }

    renderElement = (item) => {
        //return (<input defaultValue={item.type}></input>)
        if (item.type === 'textfield')
        {
            return (
            <div className="input-field" 
                style = {{
                width: '100%',
                height:'100%',
                borderColor: item.borderColor,
                border:item.borderThickness,
                borderRadius:item.borderRadius,
                background: item.background,
                }}>
            <label style={{color:item.fontColor, fontSize:item.fontSize}}>{item.defaultValue}</label>
            <input disabled/>
            </div> 
            )
        }
        else if (item.type === 'label')
        {
            return (<label
            style = {{
                width: '100%',
                height:'100%',
                borderColor: item.borderColor,
                border:item.borderThickness,
                borderRadius:item.borderRadius,
                background: item.background,
                color:item.fontColor,
                fontSize:item.fontSize
        }}
            >{item.defaultValue}</label>)
        }
        else if (item.type === 'container')
        {
            return (<div 
            style = {{
                width: '100%',
                height: '100%',
                borderColor: item.borderColor,
                border:item.borderThickness,
                borderRadius:item.borderRadius,
                background: item.background,
        }}
            ></div>)
        }
        if (item.type === 'button')
        {
            return (<button
            style = {{
                width: '100%',
                height : '100%',
                borderColor: item.borderColor,
                border:item.borderThickness,
                borderRadius:item.borderRadius,
                background: item.background,
                color:item.fontColor,
                fontSize:item.fontSize
            }}
            >{item.defaultValue}</button>)
        }
        return (<div>Error</div>)
    }


    rePos = (e, d, index) => 
    {
        window.currentIndex = index;
        //console.log("window: "+window.currentIndex);
        let items = this.state.items;
        let item = items[window.currentIndex];

        // Re position part
        if (item.x!==d.x && item.y!==d.y)
        {
            item.x = d.x;
            item.y = d.y;
            items[window.currentIndex]=item;
            this.setState({items:items,isSaved: false});
        }
        //console.log(item);
        this.loadInfo();
    }

    loadInfo = () => {
        let items = this.state.items;
        let item = items[window.currentIndex];
        console.log(item);
        //Geting all the divs
        let text = document.getElementById('text');
        let background = document.getElementById('background');
        let fontColor = document.getElementById('fontColor');
        let fontSize = document.getElementById('fontSize');
        let borderThickness = document.getElementById('borderThickness');
        let borderRadius = document.getElementById('borderRadius');

        if (item.type==='textfield')
        {
            //console.log("textfield");
            text.disabled=false;
            background.disabled = false;
            fontColor.disabled = false;
            fontSize.disabled = false;
            borderThickness.disabled = false;
            borderRadius.disabled = false;
            text.defaultValue = item.defaultValue;
            //text.innerHTML = item.defaultValue;
        }
        else if(item.type==='label')
        {
            //console.log("label");
        }
        else if(item.type==='button')
        {
            //console.log('button');
        }
        else if(item.type==='container')
        {
            //console.log('container');
        }
    }

    reSize = (e, direction, ref, delta, position, index) => {
            //     this.setState({
            //       width: ref.style.width,
            //       height: ref.style.height,
            //       ...position,
            //     });
            //   }

            console.log("width: "+ref.style.width);
            console.log("witd")

    }



    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
            
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(!todoList){
	        return <React.Fragment />
        }
        if (!this.state.ifClicked){
            this.setNewTime(todoList);
            window.currentIndex= -1;
            this.setState(state => ({
                ...state,
                name: todoList.name,
                items: todoList.items,
                ifClicked: true,
            }));
        }
        // console.log("name:"+this.state.name);
        // this.setState({name:"a"});
        // console.log("name:"+this.state.name);
        return (
            <div className="row">
                <div id="list_delete_confirmation" hidden>
                    <div id="list_delete_confirmation_content">
                    <p className="list_delete_confirmation_message">You didn't save the diagram yet.</p>
                    <br/>
                    <p id="list_delete_confirmation_bold">Are you sure you want to close this diagram without saving?</p>
                    <br/>
                    <button id="list_delete_confirmation_button_yes" onClick={this.closeWithoutSaving}
                    >Yes</button>
                    <button id="list_delete_confirmation_button_no" onClick={this.closeDeleteDialog}
                    >No</button>
                    <br/>
                    <p className="list_delete_confirmation_message">The diagram will not be saved if you clicked Yes.</p>
                </div>
                </div>

                <div className="col s2 grey lighten-2" style={{height:'650px'}}>
                <span> 
                    <i className="material-icons">zoom_in</i>
                    <i className="material-icons">zoom_out</i>
                    <Button id="save"className="btn-small" onClick={this.saveWorks}>Save</Button>
                    <Button id="close" className="btn-small" onClick={this.closeWorks}>Close</Button>
                </span>
                <div className="input-field">
                    <label htmlFor="email" className="active" style={{color:"darkgrey"}}>Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleNameChange}
                    defaultValue={todoList.name}/>
                </div> 
                <br></br>
                <br></br>
                <div className="white" style={{width:"100%", height:"50px", border:'solid'}}
                onClick={this.addContainer}></div>
                <br></br>
                <div style={{textAlign:"center"}}>Container</div>
                <br></br>
                <br></br>
                <div style={{textAlign:"center"}}
                onClick={this.addLabel}
                >Prompt for Input:</div>
                <div style={{textAlign:"center"}}>Label</div>
                <br></br>
                <br></br>
                <div style={{textAlign:"center"}}>
                    <button style={{textAlign:"center"}} onClick={this.addButton}>Submit</button>
                </div>
                <br></br>
                <div style={{textAlign:"center"}}>Button</div>
                <br></br>
                <br></br>
                <div className="input-field" onClick={this.addTextfield}>
                    <label style={{color:"darkgrey"}}>Input</label>
                    <input disabled/>
                </div> 
                <div style={{textAlign:"center"}}>Textfield</div>
                <br></br>
                <br></br>
                <br></br>
                </div>

                <div className='col s8' style={{height:'650px'}}>
                    <div id="canvas" style={{height:'650px',width: '100%', border:"solid"}}>
                    {/* <ItemsList todoList={todoList} items={this.state.items}/> */}
                    <div className="todo-lists section">
                    {this.state.items.map((item) => {
                        let index = this.state.items.indexOf(item);
                        return (
                            <Rnd
                            default={{
                                x: item.x,
                                y: item.y,
                                width: item.width,
                                height: item.height,
                              }}
                              onDragStop={(e, d) => this.rePos(e,d,index)}
                              onResizeStop={(e, direction, ref, delta, position) => {
                                  this.reSize(e, direction, ref, delta, position, index)
                              }}
                              bounds = "#canvas"
                              minHeight = {30}
                              minWidth = {30}
                            >
                                {this.renderElement(item)}
                            </Rnd>
                         )
                        ;})
                        }
                        </div>
                    </div>
                </div>

                <div className='col s2 grey lighten-2' style={{height:'650px'}}>
                <div style={{textAlign:"center"}}>Properties</div>
                <br></br>
                <div className="input-field">
                    <label style={{color:"darkgrey"}}>text</label>
                    <br></br>
                    <input id='text' disabled/>
                </div>
                <br></br>
                <span>
                    <span>Background: </span>
                    <input id="background" name="Color Picker" type="color" disabled/>
                </span>
                <br></br>
                <span>
                    <span>Border Color: </span>
                    <input id="borderColor" name="Color Picker" type="color" disabled/>
                </span>
                <br></br>
                <span>
                    <span>Font Color:</span>
                    <br></br>
                    <input id="fontColor" name="Color Picker" type="color" disabled/>
                </span>
                <br></br>
                <span><span>Font Size: </span>
                <div className="input-field">
                    <input id="fontSize" disabled/>
                </div>
                </span>
                <span><span>Border Thickness: </span>
                <div className="input-field">
                    <input id="borderThickness" disabled/>
                </div>
                </span>
                <span><span>Border Radius: </span>
                <div className="input-field">
                    <input id="borderRadius" disabled/>
                </div>
                </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList) { todoList.id = id; }
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
)(ListScreen);