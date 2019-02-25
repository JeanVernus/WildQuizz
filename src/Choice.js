import React from "react";
import ResponseToSend from "./ResponseToSend";
import { ENDPOINT } from "./const";
import socketIOClient from "socket.io-client";
import Swal from "sweetalert2";



class Choice extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            answerToSend : new ResponseToSend("","","","") ,
            clickedAnswer : "",
            endPoint : ENDPOINT,
            stateResponse : 1,
            scorePlayer: props.score,
        }
    }
    send=()=>{
        let instance = new ResponseToSend("user","master",this.props.avatar,this.state.clickedAnswer)
        const socket = socketIOClient(this.state.endPoint)
        socket.emit("answer",JSON.stringify(instance))
        console.log(this.state.answerToSend);
        
    }
  updateScorePlayer=(newScore)=>{
    this.props.onUpdateScorePlayer(newScore)
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
                <img  id ={this.props.num.text} src={require("./"+this.props.num.asset)} onClick={this.choiceClicked =()=>
                {console.log(this.props.num); 
                    document.getElementById(this.props.num.text).className = "imageClicked"
                    let ReapeatFunct=()=>{
                        if (this.props.clock === 0) {
                            console.log("ok");
                            clearInterval(inter)
                            if (this.props.num.hasOwnProperty("points")) {
                                Swal.fire({
                                    position : "top",  
                                    type : "success",
                                    title : " Bonne réponse ! ",
                                    showConfirmButton : false,
                                    timer : 1500
                            })
                            
                                this.updateScorePlayer( this.state.scorePlayer + 1)
                            }
                            else{
                                Swal.fire({
                                    title : "Mauvaise réponse !",
                                    animation : true,
                                    customClass : "animated bounce"
                                })
                            }                     
                        }
                    }
                    let inter = setInterval(ReapeatFunct, 1000) 
                this.setState({clickedAnswer: this.props.num.text})
                this.setState({stateResponse : 0})
                 }} alt="" height ="200px"width = "200px"/>
                
            </div>
            )
        return (
        <div>
            <input id = {this.props.num.text} className ="ficheButton1" type ="button" value={this.props.num.text} onClick={this.choiceClicked =()=>
                {console.log(this.props.num);
                    document.getElementById(this.props.num.text).id = "imageClicked"
                    
                        // this.increasePoints(this.props.num.points);
                    
                let ReapeatFunct=()=>{
                    if (this.props.clock === 0) {
                        console.log("ok");
                        clearInterval(inter)
                        if (this.props.num.hasOwnProperty("points")) {
                            Swal.fire({
                                position : "top",  
                                type : "success",
                                title : " Bonne réponse ! ",
                                showConfirmButton : false,
                                timer : 1500
                        })
                            this.updateScorePlayer( this.state.scorePlayer + 1)
                        }
                        else{
                            Swal.fire({
                                    title : "Mauvaise réponse !",
                                    animation : true,
                                    customClass : "animated bounce"
                                })
                        }                     
                    }
                }
                let inter = setInterval(ReapeatFunct, 1000)                
                    this.setState({clickedAnswer: this.props.num.text})
                    this.setState({stateResponse : 0})
                }} />
                
        </div>
                  )
            }
}

export default Choice;