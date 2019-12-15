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
            this.setState({...this.state,
                isSaved:true});
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
            "background": "#ffffff",
            "borderColor": "#000000",
            "borderThickness": "solid",
            "borderRadius": 2,
            "width": "200px",
            "height": "50px",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({
            ...this.state,
            items:items, 
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
            "background": "#ffffff",
            "borderColor": "#000000",
            "borderThickness": 0,
            "borderRadius": 2,
            "width": "150px",
            "height": "50px",
            "fontColor": "#000000",
            "fontSize":  "12",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({
            ...this.state,
            items:items, 
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
            "background": "#ffffff",
            "borderColor": "#000000",
            "borderThickness": "solid",
            "borderRadius": 2,
            "width": "90px",
            "height": "30px",
            "fontColor": "#000000",
            "fontSize":  "12",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({
            ...this.state,
            items:items, 
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
            "background": "#ffffff",
            "borderColor": "#000000",
            "borderThickness": 0,
            "borderRadius": 2,
            "width": "150px",
            "height": "50px",
            'defaultValue':"Input",
            "fontColor": "#808080",
            "fontSize":  "12",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({
            ...this.state,
            items:items, 
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
            <span style={{color:item.fontColor, fontSize:item.fontSize}}>{item.defaultValue}</span>
            <input disabled/>
            </div> 
            )
        }
        else if (item.type === 'label')
        {
            console.log(item.defaultValue+item.borderColor);
            return (<span
            style = {{
                width: '100%',
                height:'100%',
                borderColor: item.borderColor,
                border:item.borderThickness,
                borderRadius:item.borderRadius,
                background: item.background,
                //color:item.fontColor,
                fontSize:item.fontSize
        }}
            ><span style={{color:item.fontColor}}>{item.defaultValue}</span></span>)
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
            console.log("button: "+item.fontColor)
            return (<button
            style = {{
                width: '100%',
                height : '100%',
                borderColor: item.borderColor,
                border:item.borderThickness,
                borderRadius:item.borderRadius,
                background: item.background,
                //color:"green",//item.fontColor,
                fontSize:item.fontSize
            }}
            ><label style={{color: item.fontColor}}>{item.defaultValue}</label></button>)
        }
        return (<div>Error</div>)
    }


    rePos = (e, d, index) => 
    {
        window.currentIndex = index;
        console.log("window: "+window.currentIndex);
        let items = this.state.items;
        let item = items[window.currentIndex];

        // Re position part
        if (item.x!==d.x && item.y!==d.y)
        {
            item.x = d.x;
            item.y = d.y;
            items[window.currentIndex]=item;
            this.setState({
                ...this.state,
                items:items,isSaved: false});
        }
        //console.log(item);
        this.loadInfo();
    }

    handleTextChange = (e) => 
    {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.defaultValue = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
    }


    handleBackgroundChange = (e) => 
    {
        
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.background = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        console.log(value);
    }

    handleFontColorChange = (e) => {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.fontColor = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        console.log(value);
    }

    handleFontSizeChange = (e) => 
    {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.fontSize = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        
    }

    handleBorderRadiusChange = (e) => 
    {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.borderRadius = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
    }

    handleBorderThicknessChange = (e) =>
    {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.borderThickness = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
    }

    handleBorderColorChange = (e) =>
    {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.borderColor = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        console.log(value);
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
        let borderColor = document.getElementById('borderColor');
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
            borderColor.disabled = false;
            
            //load values
            text.value = item.defaultValue; 
            background.value = item.background;
            fontColor.value = item.fontColor;
            fontSize.value = item.fontSize;
            borderThickness.value = item.borderThickness;
            borderRadius.value = item.borderRadius;
            borderColor.value = item.borderColor;
            
            //adding listner
            text.addEventListener('change', (e) => this.handleTextChange(e));
            background.addEventListener('change', (e)=> this.handleBackgroundChange(e));
            fontColor.addEventListener('change', (e)=> this.handleFontColorChange(e));
            fontSize.addEventListener('change', (e)=> this.handleFontSizeChange(e));
            borderRadius.addEventListener('change', (e)=> this.handleBorderRadiusChange(e));
            borderThickness.addEventListener('change', (e)=> this.handleBorderThicknessChange(e));
            borderColor.addEventListener('change', (e)=> this.handleBorderColorChange(e));

        }
        else if(item.type==='label')
        {
            text.disabled=false;
            background.disabled = false;
            fontColor.disabled = false;
            fontSize.disabled = false;
            borderThickness.disabled = false;
            borderRadius.disabled = false;
            borderColor.disabled = false;

            //load values
            text.value = item.defaultValue; 
            background.value = item.background;
            fontColor.value = item.fontColor;
            fontSize.value = item.fontSize;
            borderThickness.value = item.borderThickness;
            borderRadius.value = item.borderRadius;
            borderColor.value = item.borderColor;
            
            //adding listner
            text.addEventListener('change', (e) => this.handleTextChange(e));
            background.addEventListener('change', (e)=> this.handleBackgroundChange(e));
            fontColor.addEventListener('change', (e)=> this.handleFontColorChange(e));
            fontSize.addEventListener('change', (e)=> this.handleFontSizeChange(e));
            borderRadius.addEventListener('change', (e)=> this.handleBorderRadiusChange(e));
            borderThickness.addEventListener('change', (e)=> this.handleBorderThicknessChange(e));
            borderColor.addEventListener('change', (e)=> this.handleBorderColorChange(e));
        }
        else if(item.type==='button')
        {
            text.disabled=false;
            background.disabled = false;
            fontColor.disabled = false;
            fontSize.disabled = false;
            borderThickness.disabled = false;
            borderRadius.disabled = false;
            borderColor.disabled = false;

            //load values
            text.value = item.defaultValue; 
            background.value = item.background;
            fontColor.value = item.fontColor;
            fontSize.value = item.fontSize;
            borderThickness.value = item.borderThickness;
            borderRadius.value = item.borderRadius;
            borderColor.value = item.borderColor;

            //adding listner
            text.addEventListener('change', (e) => this.handleTextChange(e));
            background.addEventListener('change', (e)=> this.handleBackgroundChange(e));
            fontColor.addEventListener('change', (e)=> this.handleFontColorChange(e));
            fontSize.addEventListener('change', (e)=> this.handleFontSizeChange(e));
            borderRadius.addEventListener('change', (e)=> this.handleBorderRadiusChange(e));
            borderThickness.addEventListener('change', (e)=> this.handleBorderThicknessChange(e));
            borderColor.addEventListener('change', (e)=> this.handleBorderColorChange(e));
        }
        else if(item.type==='container')
        {
            text.disabled=true;
            background.disabled = false;
            fontColor.disabled = true;
            fontSize.disabled = true;
            borderThickness.disabled = false;
            borderRadius.disabled = false;
            borderColor.disabled = false;

            //load values
            background.value = item.background;
            borderThickness.value = item.borderThickness;
            borderRadius.value = item.borderRadius;
            borderColor.value = item.borderColor;

            //adding listner
            background.addEventListener('change', (e)=> this.handleBackgroundChange(e));
            borderRadius.addEventListener('change', (e)=> this.handleBorderRadiusChange(e));
            borderThickness.addEventListener('change', (e)=> this.handleBorderThicknessChange(e));
            borderColor.addEventListener('change', (e)=> this.handleBorderColorChange(e));
        }
    }

    reSize = (e, direction, ref, delta, position, index) => {
        window.currentIndex = index;
        console.log("window: "+window.currentIndex);
        let items = this.state.items;
        let item = items[window.currentIndex];

        // Re position part
        if (item.width!==ref.style.width && item.height!==ref.style.height)
        {
            item.width = ref.style.width;
            item.height = ref.style.height;
            items[window.currentIndex]=item;
            this.setState({
                ...this.state,
                items:items,isSaved: false});
        }
        //console.log(item);
        this.loadInfo();

    }

    unselect = () => {
        console.log("unselect");
        let text = document.getElementById('text');
        let background = document.getElementById('background');
        let fontColor = document.getElementById('fontColor');
        let fontSize = document.getElementById('fontSize');
        let borderColor = document.getElementById('borderColor');
        let borderThickness = document.getElementById('borderThickness');
        let borderRadius = document.getElementById('borderRadius');
            

        text.value = ''; 
        background.value =  '';
        fontColor.value = '';
        fontSize.value = '';
        borderThickness.value = '';
        borderRadius.value = '';
        borderColor.value = '';

            text.disabled=true;
            background.disabled = true;
            fontColor.disabled = true;
            fontSize.disabled = true;
            borderThickness.disabled = true;
            borderRadius.disabled = true;
            borderColor.disabled = true;
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
                    <div id="canvas" style={{height:'650px',width: '100%', border:"solid"}}
                     onClick={()=> this.unselect()}
                    >
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
                              onClick={(event)=> event.stopPropagation()}
                              onDragStop={(event, d) => this.rePos(event,d,index)}
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