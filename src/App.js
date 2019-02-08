import React, { Component } from "react";
import interro2 from "./interro2.png"
import interro3 from "./interro3.png"
import Formulaire from "./Formulaire";
import Questions from "./Questions";
import User from "./User.js";
import Quiz from "./Quiz";
import bdd from "./game.json";



const DEBUT = 0;
const FORMULAIRE = 1;
const QUESTION = 2;
const PLAYER =3;

class App extends Component {
  constructor (props){
    super(props);
    let etat = DEBUT;
    this.state = {etat}
    this.quiz = new Quiz(bdd);
    let test = 10;
    this.state={test};
  }
afficheQuestion=()=>{console.log("okki");

  this.setState({test:document.getElementById("numQuest").value})}
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

  render() {
    if(this.state.etat === FORMULAIRE){
      return (<Formulaire/>)}

    if (this.state.etat === QUESTION){
      return(<Questions quiz={this.quiz}/>)
    }
    if (this.state.etat === PLAYER){
      return(
      <div>
        <input class ="texte1"id="numQuest" type="text"/> 
        <input class="texte1"value="Afficher question" onClick={this.afficheQuestion} type="button"/>
        <User quiz={this.quiz} numQuest={this.state.test}/>
        </div>
        )
    }
    return (
      <div>
      <header>
      <ul id="navbar">
                  <li class="active"><a>WildQuiz</a></li>
                  <li><a >Porfile</a></li>
                  <li><a>Best gamers</a></li>
          </ul>
      </header>
        <div>
          
          <input className="bt1"value="LOGIN" type="button" onClick ={this.choicePlayers}/>
          <input className="bt2" value="MASTER" type="button"onClick ={this.pressMaster}/>
          <input className="bt3" value="PLAYER" type="button"onClick ={this.pressPlayer}/>
      
        </div>
        <footer>
          <p>
                                          
            WildQuiz
                                      
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
