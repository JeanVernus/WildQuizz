import React from 'react';
import MessToSend from './MessToSend';
import socketIOClient from "socket.io-client";


class Items1 extends React.Component{
    constructor(props){
    super(props);
    this.state = {tableGamesIndex: [], 
                 tableGamesState : [], 
                 tableStepState : [],
                 functionNbGames : "not called",
                 tableStepIndex: [],
                 tableQuestionsIndex : [],
                 tableQuestionsState : [],
                 clientType : "Master",
                 message : new MessToSend("","","",""),
                 endPoint : "http://192.168.15.60:4002", 
                 

                }

}
    /*Socket.io part*/

    send=(value)=>{
        let instance = new MessToSend(this.state.clientType,"Master",value,"")
        const socket = socketIOClient(this.state.endPoint)
        socket.emit("objet", JSON.stringify(instance))
        console.log(JSON.stringify(instance));
}
    /////////////////////////////////////////////////

    choiceQuestions=()=>{
        let selectBoxClassName = document.getElementById('optionElt2')
        let selectedValue = parseInt(selectBoxClassName.value);
        // console.log(selectedValue);
        this.setState({choosenQuestions: selectedValue})
        this.send(selectedValue)
    }


    choiceGame=()=>{
        this.setState({tableStepIndex:[]})
        let selectBoxClassName = document.getElementById('optionElt')
        let selectedValue = parseInt(selectBoxClassName.value);
        // console.log(selectedValue);
        this.displaySteps(selectedValue);
        
    }
    choiceSteps=()=>{
        this.setState({tableQuestionsIndex:[]})
        let selectBoxClassName = document.getElementById('optionElt1')
        let selectedValue = parseInt(selectBoxClassName.value);
        // console.log(selectedValue);
        this.displayQuestions(selectedValue);
    }

    displaySteps=(gameValue)=>{
       // console.log("tate: "+gameValue);
        for (let i = gameValue + 1;i < this.props.quiz.jsonData.slides.length;i++ ){
            
            if (this.props.quiz.jsonData.slides[i].type === "step") {
                this.state.tableStepIndex.push(i);
                //console.log("step ajouté au tableau");
            }
            if (this.props.quiz.jsonData.slides[i].type === "game"){
                //console.log("game trouvé");
                break;
            }
        }
    let tableSteps = this.state.tableStepIndex.map((indexSteps)=>{
        return (<option className ="bt0" value={indexSteps} >{this.props.quiz.jsonData.slides[indexSteps].title}</option>)
    })
    this.setState({tableStepState : tableSteps}); 
         //console.log("tab step: "+this.state.tableStepIndex);
    }

    displayQuestions=(stepValue)=>{
        console.log("in Question");
        
        // console.log("tate: "+gameValue);
         for (let i = stepValue + 1;i < this.props.quiz.jsonData.slides.length;i++ ){
             
             if (this.props.quiz.jsonData.slides[i].type === "question") {
                 this.state.tableQuestionsIndex.push(i);
                 //console.log("step ajouté au tableau");
             }
             if (this.props.quiz.jsonData.slides[i].type === "step"){
                 //console.log("game trouvé");
                 break;
             }
         }
     let tableQuestions = this.state.tableQuestionsIndex.map((indexQuestions)=>{
         return (<option className ="bt0" value={indexQuestions} >{this.props.quiz.jsonData.slides[indexQuestions].title}</option>)
     })
     this.setState({tableQuestionsState : tableQuestions}); 
     console.log("tab step: "+this.state.tableQuestionsState);
          
     }
    
    nbGames=()=>{
    let retour = 0;
        for (let i = 0; i < this.props.quiz.jsonData.slides.length; i++){
            if (this.props.quiz.jsonData.slides[i].type === "game") {
                retour++;
                this.state.tableGamesIndex.push(i);
            }
        }
        
    let tableGames = this.state.tableGamesIndex.map((indexGames)=>{
        return (<option className ="bt0" value={indexGames} >{this.props.quiz.jsonData.slides[indexGames].title}</option>)
    })
    this.setState({tableGamesState : tableGames}); 
    this.setState({functionNbGames : "called"})
        return retour;
    }

    render(){
        console.log("tab step: "+this.state.tableQuestionsState);
    
        if (this.state.functionNbGames === "not called"){
            this.nbGames()
        }
    // console.log(this.state.tableGamesState)
        return(
            <div>
                <select onChange ={this.choiceGame} id="optionElt" className="bt4">
                    <option>GAMES</option>
                        {this.state.tableGamesState}
                </select><br />
                <select onChange ={this.choiceSteps} id="optionElt1" className="bt5">
                    <option>STEPS</option>
                        {this.state.tableStepState}
                </select><br />
                <select  onChange ={this.choiceQuestions} id="optionElt2"className="bt6">
                    <option>QUESTIONS</option>
                        {this.state.tableQuestionsState}
                </select>
                <input type="button" onClick={this.send}/>
            </div>

        )
    }
}
export default Items1;