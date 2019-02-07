import React, { Component } from "react";
import interro2 from "./interro2.png"
import interro3 from "./interro3.png"
import Formulaire from "./Formulaire";
import Questions from "./Questions";
import Quiz from "./Quiz";
import bdd from "./game.json";



const DEBUT = 0;
const FORMULAIRE = 1;
const QUESTION = 2;

class App extends Component {
  constructor (props){
    super(props);
    let etat = DEBUT;
    this.state = {etat}
    this.quiz = new Quiz(bdd);
    
  }

  choicePlayers=()=>{
    //this.state.etat = FORMULAIRE;
    this.setState ({etat:FORMULAIRE});
  }

  pressMaster=()=>{
    this.setState({etat:QUESTION});
  }

  render() {
    if(this.state.etat === FORMULAIRE){
      return (<Formulaire/>)}

    if (this.state.etat === QUESTION){
      return(<Questions quiz={this.quiz}/>)
    }
    return (
      <div>
        <header>
          <h1><img className="ptBt" src={interro2}alt=""/> Wild Quiz<img className="ptBt1"src={interro3}alt=""/></h1>
        </header>
          <div>
            
            <input className="bt1"value="PLAYER" type="button" onClick ={this.choicePlayers} />
            <input className="bt2" value="MASTER" type="button"onClick ={this.pressMaster}/>
            
          </div>
        </div>
    );
  }
}

export default App;
