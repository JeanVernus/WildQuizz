import React, { Component } from "react";
import Formulaire from "./Formulaire";
import Master from "./Master";
import User from "./User.js";
import Quiz from "./Quiz";
import bdd from "./game.json";
import MessToSend from "./MessToSend";
import socketIOClient from "socket.io-client";



const DEBUT = 0;
const FORMULAIRE = 1;
const QUESTION = 2;
const PLAYER =3;

class App extends Component {
  constructor (props){
    super(props);
    let etat = DEBUT;
    this.state = {
      etat,
      message : new MessToSend("","","",""),
      isMessageReceived: "no",
      endPoint : "http://192.168.15.60:4002",
    }
    this.quiz = new Quiz(bdd);
    
  }

  choicePlayers=()=>{
    //this.state.etat = FORMULAIRE;
    this.setState ({etat:FORMULAIRE});
  }

  pressMaster=()=>{
    this.setState({etat:QUESTION});
  }

  pressPlayer=()=>{
    this.setState({etat:PLAYER});
  }

  componentDidMount(){
    const socket = socketIOClient(this.state.endPoint)
    socket.on("objet",(obj)=>{
        console.log("ok");
    var receivedObj = JSON.parse(obj);
    this.setState({message : receivedObj})    
    this.setState({isMessageReceived: "yes"})
    })
    }

  render() {
    
    if(this.state.etat === FORMULAIRE){
      return (<Formulaire/>)}

    if (this.state.etat === QUESTION){
      return(<Master/>)
    }
    if (this.state.etat === PLAYER){
      if (this.state.isMessageReceived === "yes") {
        return(<User quiz={this.quiz} numQuest={this.state.message.objContent}/>)
      }
      if (this.state.isMessageReceived == "no"){
        return(<div>
          <h1>En attente de la question</h1>
        </div>)
      }
     
    }
    return (
      <div>
        <header>
          <h1>Wild Quiz</h1>
        </header>
          <div>
            
            <input className="bt1"value="PLAYER" type="button" onClick ={this.pressPlayer} />
            <input className="bt2" value="MASTER" type="button"onClick ={this.pressMaster}/>
            <input className="bt3"value="LOGIN" type="button" onClick ={this.choicePlayers} />
          </div>
        </div>
    );
  }
}

export default App
