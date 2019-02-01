import React from "react"
import "./App.css";
import Jsondata from "./Jsondata.js"
import interro2 from "./interro2.png"
import interro3 from "./interro3.png"

let listeQuestions = [];

for(let i = 0; i<Jsondata.slides.length; i++){
    if (Jsondata.slides[i].type === "question")
    listeQuestions.push(Jsondata.slides[i].title);   
}
console.log(listeQuestions.length)

class Questions extends React.Component{
    constructor(props) {
        super(props);
        let questionToDisplay= "";
        this.state = {questionToDisplay};
        this.afficheQuestion = this.afficheQuestion.bind(this);

        console.log(this.state.questionToDisplay);
    }
afficheQuestion(){
   let idQuest = document.getElementById('numQuest').value;
   this.setState({questionToDisplay: listeQuestions[idQuest]}); 
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
                    <p class = "texte2">
                    Réponse :
                    </p>
                    <input class ="texte1"id="numQuest" type="text"/><br /><br /><br /><br /><br /><br />
                </div>
            </div>
            )
        }
}
export default Questions