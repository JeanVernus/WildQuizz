import React from "react"
import "./fiche.css"
import socketIOClient from "socket.io-client";
import MessToSend from "./MessToSend";
import User from "./User";
import {ENDPOINT} from "./const"
import Quiz from "./Quiz";
import bdd from "./game.json";
import Swal from "sweetalert2";


const DEBUT = 0;
const PLAYER =1;

class FichePlayer extends React.Component{
    constructor(props){
        super(props);
        let imgSrc = "";
        this.memAnswer = [];
        this.state = {
            imgSrc,
            etat : DEBUT,
            message : new MessToSend("","","",""),
            isMessageReceived: "no",
            endPoint : ENDPOINT,
            receivedTime : 0,
            count : 0,
        }
        this.quiz =new Quiz (bdd)
        
    }
    pressPlayer=()=>{
        this.setState({etat:PLAYER});
      }

      updatememanswer=(num,val)=>{
        console.log(num+ " " +val);
        
         this.memAnswer[num].etat=val;
      }

      timer=(value)=>{
        this.setState({count : value})
        let subOneSec = ()=>{
            if(this.state.count>0){
                this.setState({count : this.state.count -1})
               
                
            }
            else if (isNaN(this.state.count)){
                
                
            }
            else {
                clearInterval(setInterVar)
                console.log("je passe ici");
                
                for ( let i = 0 ; i < this.quiz.jsonData.slides[this.state.message.objContent].choices.length; i++ ){
                  console.log("je passe la"+ i+" "+this.memAnswer[i].etat);
                  
                  if (this.memAnswer[i].etat === 1)
                    if ( this.quiz.jsonData.slides[this.state.message.objContent].choices[i].hasOwnProperty("points")){

                      this.props.source.incscore();
                        this.setState({count : 0})
                        Swal.fire({
                          position : "top",  
                          type : "success",
                          title : " Bonne réponse ! ",
                          showConfirmButton : false,
                          timer : 1500
                  })
                  
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
        }
        var setInterVar = setInterval(subOneSec,1000)
    }

      componentDidMount(){
        const socket = socketIOClient(this.state.endPoint)
        socket.on("objet",(obj)=>{
       
        var receivedObj = JSON.parse(obj);
        this.setState({message : receivedObj})    
        this.setState({isMessageReceived: "yes"})
        this.memAnswer =[];
        
        for (let i = 0 ; i < this.quiz.jsonData.slides[this.state.message.objContent].choices.length; i ++){
          this.memAnswer.push({
            "name" : this.quiz.jsonData.slides[this.state.message.objContent].choices[i].text,
            "etat" : 0,
          })
      }
        if (this.state.message.timer==="on"){
            this.setState({receivedTime : this.state.message.timerTime})
            this.timer(this.state.message.timerTime)
        }
        })
    }

    render(){
  
    
        if (this.state.etat === PLAYER){
            if (this.state.isMessageReceived === "yes") {

    
              return(
            <div>  
              <User  key={"User"} update={this.updatememanswer} time = {this.state.count} quiz={this.quiz} numQuest={this.state.message.objContent} avat ={this.props.source.avatar} nick ={this.props.source.nick} score ={this.props.source.score} memoryAnswer ={ this.memAnswer} />
            </div>
              )}
            if (this.state.isMessageReceived === "no"){
              return(
              <div className="div-button">
                <h1 className = "ficheButton2">En attente de la question</h1>
              </div>
                    )
            }
        }
        return(
            <div>
            <div id="boxFichePlayer">
                <div> <img src={this.props.source.avatar} alt=""width ="250px" height="250px"/>
                <h1>{this.props.source.nick}</h1></div>
                <h2>Score: {this.props.source.score}</h2>
            </div> 
            <div className = "div-button">
            <input className = "ficheButton"type ="button" value="JOUER" onClick={this.pressPlayer}/>
            </div>
            </div>
        )
    }
}
export default FichePlayer