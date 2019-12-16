import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import {Button} from 'react-materialize';
import firebase from 'firebase/app';
import { Rnd } from 'react-rnd';

class ListScreen extends Component {
    state = {
        name:'',
        items: [],
        item: null,
        isSaved: false,
        ifClicked: false,
        scale: 1,
        update:true,
        wireframe: []
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
        let value = e.target.value;
        if (value==='')
            value = 'unknown';
        this.setState({...this.state,name:value,isSaved:false});
        document.getElementById("save").disabled = false;
    
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
        if (!this.state.isSaved)
        {
            let todoList = this.props.todoList;
            let listID = todoList.id;
            getFirestore().collection("todoLists").doc(listID).update({
                items:this.state.items,
                name:this.state.name,
                width: this.state.wireframe.width,
                height:this.state.wireframe.height
            })
            this.setState({...this.state,
                isSaved:true});
        }
        document.getElementById("save").disabled = true;
        console.log("save");
        
    }

    closeWorks = () => {
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
        let items = this.state.items;
        let item =          
        {
            "key": items.length,
            "type": "container",
            "background": "#ffffff",
            "borderColor": "#000000",
            "borderThickness": "2px solid",
            "borderRadius": 0,
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
        let items = this.state.items;
        let item =          
        {
            "key": items.length,
            "type": "label",
            "defaultValue": 'Prompt for Input',
            "background": "#ffffff",
            "borderColor": "#000000",
            "borderThickness": 0,
            "borderRadius": 0,
            "width": "150px",
            "height": "50px",
            "fontColor": "#000000",
            "fontSize":  "12px",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({
            ...this.state,
            items:items, 
            
            isSaved: false});
        document.getElementById("save").disabled = false;
    }

    addButton = () => {
        let items = this.state.items;
        let item =          
        {
            "key": items.length,
            "type": "button",
            "defaultValue": 'Submit',
            "background": "#ffffff",
            "borderColor": "#000000",
            "borderThickness": "2px solid",
            "borderRadius": 0,
            "width": "90px",
            "height": "30px",
            "fontColor": "#000000",
            "fontSize":  "12px",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({
            ...this.state,
            items:items, 
            
            isSaved: false});
        document.getElementById("save").disabled = false;
    }

    addTextfield = () => {
        let items = this.state.items;
        let item =          
        {
            "key": items.length,
            "type": "textfield",
            "background": "#ffffff",
            "borderColor": "#000000",
            "borderThickness": 0,
            "borderRadius": 0,
            "width": "150px",
            "height": "50px",
            'defaultValue':"Input",
            "fontColor": "#808080",
            "fontSize":  "12px",
            "x":0,
            "y":0
        };
        items.push(item);
        this.setState({
            ...this.state,
            items:items, 
            
            isSaved: false});
        document.getElementById("save").disabled = false;
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
                border:"solid",
                borderWidth:item.borderThickness,
                borderRadius:item.borderRadius,
                borderColor: item.borderColor,
                background: item.background,
                }}>
            <span style={{color:item.fontColor, fontSize:item.fontSize}}>{item.defaultValue}</span>
            <input disabled/>
            </div> 
            )
        }
        else if (item.type === 'label')
        {
            return (<div
            style = {{
                width: '100%',
                height:'100%',
                border:"solid",
                borderWidth:item.borderThickness,
                borderRadius:item.borderRadius,
                borderColor: item.borderColor,
                background: item.background
        }}
            ><div style={{                width: '100%',
            height:'100%',color:item.fontColor,  fontSize:item.fontSize}}>{item.defaultValue}</div></div>)
        }
        else if (item.type === 'container')
        {
            return (<div 
            style = {{
                width: '100%',
                height: '100%',
                border:"solid",
                borderWidth:item.borderThickness,
                borderRadius:item.borderRadius,
                borderColor: item.borderColor,
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
                border:"solid",
                borderWidth:item.borderThickness,
                borderRadius:item.borderRadius,
                borderColor: item.borderColor,
                background: item.background
            }}
            ><label style={{color: item.fontColor,fontSize:item.fontSize}}>{item.defaultValue}</label></button>)
        }
        return (<div>Error</div>)
    }


    rePos = (e, d, index) => 
    {
        window.currentIndex = index;
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
            document.getElementById("save").disabled = false;
        }
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
        document.getElementById("save").disabled = false;
    }


    handleBackgroundChange = (e) => 
    {
        
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.background = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        document.getElementById("save").disabled = false;
    }

    handleFontColorChange = (e) => {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.fontColor = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        document.getElementById("save").disabled = false;
    }

    handleFontSizeChange = (e) => 
    {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.fontSize = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        document.getElementById("save").disabled = false;
        
    }

    handleBorderRadiusChange = (e) => 
    {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.borderRadius = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        document.getElementById("save").disabled = false;
    }

    handleBorderThicknessChange = (e) =>
    {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.borderThickness = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        document.getElementById("save").disabled = false;
    }

    handleBorderColorChange = (e) =>
    {
        let value = e.target.value;
        let items = this.state.items;
        let item = items[window.currentIndex];
        item.borderColor = value;
        items[window.currentIndex]=item;
        this.setState({...this.state,items:items,isSaved:false});
        document.getElementById("save").disabled = false;
    }


    loadInfo = () => {
        let items = this.state.items;
        let item = items[window.currentIndex];
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
            text.value = ''; 
            fontColor.value = '';
            fontSize.value = '';
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
        document.getElementById("save").disabled = false;
        this.loadInfo();

    }

    unselect = () => {
        window.currentIndex = -1;

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

            let a = this.state.scale;
            this.setState({...this.state, scale:a});

    }

    keyDownEvent = (event) => 
    {
        event.preventDefault()
        if (window.currentIndex!==-1)
        {
            //event.preventDefault()
            if (event.ctrlKey && event.keyCode === 68)
            {
                //event.preventDefault()
                let item = this.state.items[window.currentIndex];
                let items = this.state.items;
                let DupItem;
                if (item.type!=='container')
                {
                    DupItem = {
                        "key": items.length,
                        "type": item.type,
                        "background": item.background,
                        "borderColor": item.borderColor,
                        "borderThickness": item.borderThickness,
                        "borderRadius": item.borderRadius,
                        "width": item.width,
                        "height": item.height,
                        'defaultValue': item.defaultValue,
                        "fontColor": item.fontColor,
                        "fontSize":  item.fontSize,
                        "x": Number(item.x)+100,
                        "y": Number(item.y)+100
                    };
                }
                else 
                {
                    DupItem = {
                        "key": items.length,
                        "type": item.type,
                        "background": item.background,
                        "borderColor": item.borderColor,
                        "borderThickness": item.borderThickness,
                        "borderRadius": item.borderRadius,
                        "width": item.width,
                        "height": item.height,
                        "x": Number(item.x)+100,
                        "y": Number(item.y)+100
                    };
                }
                items.push(DupItem);
                this.setState({
                    ...this.state,
                    items:items, 
                    isSaved: false});
                document.getElementById("save").disabled = false;
            }
            else if (event.keyCode === 46)
            {
                let items = this.state.items;
                items.splice(window.currentIndex, 1);
                this.setState({...this.state, items:items, isSaved:false});
                document.getElementById("save").disabled = false;
                window.currentIndex = -1;

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
        }
        else
            console.log("KeyDownError");
    }

    zoomIn = () => {
        let scale = Number(this.state.scale);
        scale = scale * 2;
        this.setState({...this.state, scale:scale});

    }

    zoomOut = () => 
    {
        let scale = Number(this.state.scale);
        scale = scale / 2;
        this.setState({...this.state, scale:scale});
    }

    isHidden = (index) => {
        if (window.currentIndex===index)
            return false;
        return true;
    }

    select = (event) =>
    {
        event.stopPropagation();
        let a = this.state.scale;
        this.setState({...this.state, scale:a});
    }

    updateDimension = () => 
    {
        let width = Number(document.getElementById("width").value);
        let height = Number(document.getElementById("height").value);
        document.getElementById("save").disabled = false;
        if (Number.isInteger(width)&&Number.isInteger(height) &&
         Number(width)<=5000 && Number(height)<=5000 &&
         Number(width)>=1 && Number(height)>=1
        )
        {
           let wireframe = this.state.wireframe;
           wireframe.height = height;
           wireframe.width = width;
           document.getElementById("save").disabled = false;
           this.setState({...this.state, update:true, isSaved:false});
        }
        else
        this.setState({...this.state, update:true});
    }

    handleDimensionChange = () => 
    {
        this.setState({...this.state, update: false});
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
            window.currentIndex = -1;
            this.setState(state => ({
                ...state,
                name: todoList.name,
                items: todoList.items,
                ifClicked: true,
                isSaved: true,
                wireframe: todoList
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
                    <i className="material-icons" onClick={this.zoomIn}>zoom_in</i>
                    <i className="material-icons" onClick={this.zoomOut}>zoom_out</i>
                    <Button id="save"className="btn-small" onClick={this.saveWorks} disabled={this.state.isSaved}>Save</Button>
                    <Button id="close" className="btn-small" onClick={this.closeWorks}>Close</Button>
                </span>
                <div className="input-field">
                    <label htmlFor="email" className="active" style={{color:"darkgrey"}}>Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleNameChange}
                    defaultValue={todoList.name}/>
                </div> 
                <br></br>
                <div className="white" style={{width:"100%", height:"50px", border:'solid'}}
                onClick={this.addContainer}></div>
                <div style={{textAlign:"center"}}>Container</div>
                <br></br>
                <div style={{textAlign:"center"}}
                onClick={this.addLabel}
                >Prompt for Input:</div>
                <div style={{textAlign:"center"}}>Label</div>
                <br></br>
                <div style={{textAlign:"center"}}>
                    <button style={{textAlign:"center"}} onClick={this.addButton}>Submit</button>
                </div>
                <div style={{textAlign:"center"}}>Button</div>
                <br></br>
                <div className="input-field" style={{border:'solid'}} onClick={this.addTextfield}>
                    <label style={{color:"darkgrey"}}>Input</label>
                    <input disabled/>
                </div> 
                <div style={{textAlign:"center"}}>Textfield</div>
                <br></br>
                <span className="input-field">
                    <label className="active" style={{color:"darkgrey"}}>Height</label>
                    <input className="active" type="text" id="height" onChange={this.handleDimensionChange}
                    defaultValue={this.state.wireframe.height}/>
                </span> 
                <br></br>
                <span className="input-field">
                    <label className="active" style={{color:"darkgrey"}}>Width</label>
                    <input className="active" type="text" id="width" onChange={this.handleDimensionChange}
                    defaultValue={this.state.wireframe.width}/>
                </span> 
                <button disabled={this.state.update} onClick={this.updateDimension}>Update</button>
                </div>

                <div className='col s8' style={{height:'650px', overflow: 'auto'}}>
                    <div id="canvas" style={{overflow: 'auto',transform: 'scale('+this.state.scale+')',
                    height:this.state.wireframe.height ,width: this.state.wireframe.width, border:"solid"
                    }} tabIndex='0'
                     onClick={()=> this.unselect()} onKeyDown={(e)=>this.keyDownEvent(e)}
                    >
                        <div>
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
                              onClick={(event)=> this.select(event)}
                              onDragStop={(event, d) => this.rePos(event,d,index)}
                              onResizeStop={(e, direction, ref, delta, position) => {
                                  this.reSize(e, direction, ref, delta, position, index)
                              }}
                              enableResizing={{top:false, bottom:false, left:false,right:false
                            , topLeft:true, topRight:true, bottomLeft:true, bottomRight:true}}
                              bounds = "#canvas"
                              minHeight = {30}
                              minWidth = {30}
                              
                            >
                            <div class="" hidden={this.isHidden(index)} style={{position: 'absolute', border:'solid',
                                  width: '20px', height: '20px', left: '-10px', top: '-10px', cursor: 'nw-resize'}}></div>
                             <div class="" hidden={this.isHidden(index)} style={{position: 'absolute', border:'solid',
                                  width: '20px', height: '20px', right: '-10px', top: '-10px', cursor: 'nw-resize'}}></div>
                             <div class="" hidden={this.isHidden(index)} style={{position: 'absolute', border:'solid',
                                  width: '20px', height: '20px', left: '-10px', bottom: '-10px', cursor: 'nw-resize'}}></div>
                             <div class="" hidden={this.isHidden(index)} style={{position: 'absolute', border:'solid',
                                  width: '20px', height: '20px', right: '-10px', bottom: '-10px', cursor: 'nw-resize'}}></div>
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