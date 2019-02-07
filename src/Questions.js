import React from "react"
import "./App.css";
import interro2 from "./interro2.png";
import interro3 from "./interro3.png";
import Items from './Items';
import Items1 from "./Items1";
import Quiz from "./Quiz";
import bdd from "./game.json";



class Questions extends React.Component{
    constructor(props) {
        super(props);
        let reponseToDisplay= "";
        let questionToDisplay= "";
        let imageToDisplay ="";
        this.state = {reponseToDisplay};
        this.state = {questionToDisplay};
        this.state = {imageToDisplay};
        this.quiz = new Quiz(bdd);

        
    }
afficheQuestion=()=>{
   let idQuest = document.getElementById('numQuest').value;
     if (this.props.quiz.jsonData.slides[idQuest].hasOwnProperty("choices"))
        this.setState({questionToDisplay:this.props.quiz.jsonData.slides[idQuest].title, 
            imageToDisplay: this.props.quiz.jsonData.slides[idQuest].asset,
            reponseToDisplay:<Items1 quiz={this.quiz} numQuest={idQuest}/>})
    else if (this.props.quiz.jsonData.slides[idQuest].choices.hasOwnProperty("asset"))
        this.setState({questionToDisplay:this.props.quiz.jsonData.slides[idQuest].title, 
            imageToDisplay: "",
            reponseToDisplay:<Items quiz={this.quiz} numQuest={idQuest}/>})

    
    else 
        this.setState({questionToDisplay:this.props.quiz.jsonData.slides[idQuest].title, 
            imageToDisplay: this.props.quiz.jsonData.slides[idQuest].asset,
            reponseToDisplay: ""}); 
}
    render()
    {
        return(
            <div>
                <header>
                    <h1><img className="ptBt" src={interro2}alt=""/> Questions<img className="ptBt1"src={interro3}alt=""/></h1>
                </header>
                <div class ="Questions1">
                    <br /><br /><br />
                    <h2>Choix de la question <br />
                    <input class ="texte1"id="numQuest" type="text"/></h2> <br /><br /><br /><br /><br /><br />
                    <input class="texte1"value="Afficher question" onClick={this.afficheQuestion} type="button"/>
                    <p class="texte2">
                    {this.state.questionToDisplay}
                    </p>
                    <div>
                    <img class="texte3" src ={require ("./"+this.state.imageToDisplay)}alt="" height ="500px" width="500px"/>
                    <p class="texte2">
                    {this.state.reponseToDisplay}
                    </p>
                    </div>
                </div>
            </div>
            )
        }
}
export default Questions