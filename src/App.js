import React, { Component } from "react";
import Formulaire from "./Formulaire";
import Master from "./Master";
import Quiz from "./Quiz";
import bdd from "./game.json";
import MessToSend from "./MessToSend";
import Items1 from "./Items1";
import socketIOClient from "socket.io-client";
import {ENDPOINT} from "./const";
import "./App.css";


const DEBUT = 0;
const FORMULAIRE = 1;
const QUESTION = 2;
const PLAYER =3;


class App extends Component {
  constructor (props){
    super(props);
    let etat = DEBUT;
    this.state = {
      redirectState : 0,
      etat,
      message : new MessToSend("","","",""),
      isMessageReceived: "no",
      endPoint : ENDPOINT
    }
    this.quiz = new Quiz(bdd);
    
  }
  redirectItem =()=>{

    this.setState({redirectState: 1})
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
    
    if(this.state.redirectState === 1){
      return <div>
      
      <Items1  key={"items1"} quiz={this.quiz}/>
      </div>
    }
    if(this.state.etat === FORMULAIRE){
      return (<Formulaire/>)
    }

    if (this.state.etat === QUESTION){
      return(<Master/>)
    }
    
    return (
      <div>
        <header>
          
              <h1>
              <span className="navbar active saumon">W</span>
              <span>ild</span>
              <span className ="saumon">Q</span>
              <span>uiz</span>
              </h1>
        </header>
              <h1 className = "title"> Testez vos conaissances</h1>
        
      <div>

      </div>
          <footer>
         <h3>
           <span className="saumon">W</span>
              <span>ild</span>
              <span className ="saumon">Q</span>
              <span>uiz</span>
        </h3> 
          </footer>
      <div className="div-button">
            
            <input className="hvr-bob" value="Joueurs" type="button" onClick ={this.choicePlayers}/>
            <input className="hvr-bob" value="Master" type="button"onClick ={this.redirectItem}/>

          </div>
      </div>
    );
  }
}

export default App
