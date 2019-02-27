import React from "react";
import ResponseToSend from "./ResponseToSend";
import { ENDPOINT } from "./const";
import socketIOClient from "socket.io-client";




class Choice extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            answerToSend : new ResponseToSend("","","","") ,
            clickedAnswer : "",
            endPoint : ENDPOINT,
            stateResponse : 1,
            checkClockAndAnswer: 0,
            activeCheck: 0,
        }
    }
    send=()=>{
        let instance = new ResponseToSend("user","master",this.props.avatar,this.state.clickedAnswer)
        const socket = socketIOClient(this.state.endPoint)
        socket.emit("answer",JSON.stringify(instance))
        console.log(this.state.answerToSend);
        
    }


choiceClicked =()=>{

    for (let i = 0; i < this.props.tableMemAnswer.length; i++)
    {
            this.props.update(i,0);
            document.getElementById(this.props.tableMemAnswer[i].name).style.border = "none";

        if(this.props.tableMemAnswer[i].name === this.props.num.text){
            this.props.update(i,1);
            document.getElementById(this.props.num.text).style.border= "thick solid red"; 
        }

    }

this.setState({clickedAnswer: this.props.num.text})
this.setState({stateResponse: 0})

}
    render(){
        
        if (this.props.avatar && this.state.clickedAnswer && this.state.stateResponse === 0 ){
             console.log(this.props.avatar + this.state.clickedAnswer)
            this.send();
            this.setState({stateResponse : 1})
        }
        if (this.props.num.hasOwnProperty("asset"))
            return(
            <div>
                <p className ="" >{this.props.num.text}</p>
                <img  id ={this.props.num.text} src={require("./"+this.props.num.asset)} onClick={this.choiceClicked} alt="" height ="200px"width = "200px"/>
            </div>
            )
        return (
        <div>
            <input id = {this.props.num.text} className ="ficheButton1" type ="button" value={this.props.num.text} onClick={this.choiceClicked} />
        </div>
                  )
            }
}

export default Choice;