import React from "react";
import Choice from "./Choice.js";
import { log } from "util";

class User extends React.Component{
    constructor(props){
        super(props);

        this.state={
            score:0,
            memoryAnswer: [],
        }
    }
    
    onUpdateScorePlayer=(score)=>{
        this.setState({score})
    }

    render(){
        let row = [];
        let memAnswer = []
        
        
        let pluscourt=this.props.quiz.jsonData.slides[this.props.numQuest];
        // console.log("ci dessous: ");
        
        // console.log(pluscourt);

        
        
       
        for (let i=0; i < pluscourt.choices.length; i ++){
            row.push (<Choice tableMemAnswer={memAnswer} score={this.state.score} onUpdateScorePlayer={(score) =>this.onUpdateScorePlayer(score)} clock={this.props.time}  key ={i} num={this.props.quiz.jsonData.slides[this.props.numQuest].choices[i]} avatar={this.props.avat} />);
            memAnswer.push({
                "name" : this.props.quiz.jsonData.slides[this.props.numQuest].choices[i].text,
                "etat" : 0,

            })
            
           
           
        }

        if (row[0].props.num.hasOwnProperty("asset")) {
            
            if (this.props.quiz.jsonData.slides[this.props.numQuest].hasOwnProperty("asset")){
                
                
               

            
            return  (
                <div class="flex">
                    <div >
                    <h2>{this.props.nick}</h2>
                     <h2>Score:{this.state.score}</h2>
                </div>
                <div className = "ecran">
                    <h5 className="title1">{this.props.quiz.jsonData.slides[this.props.numQuest].title}</h5>
                    <div className="question">
                    <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].asset)} alt=""width = "400px" height = "400px"/>
                    <div className="reponse">
                {row}
                </div>
                </div>
                </div>
                <h4 className ="horloge"><br />{this.props.time}</h4>
                </div>
                    )
            }
    
            return  (
                <div className="flex">
                    <div >
                    <h2>{this.props.nick}</h2>
                    <h2>Score:{this.state.score}</h2>
                </div>
                <div className = "ecran1">
                    <h5 className="title1">{this.props.quiz.jsonData.slides[this.props.numQuest].title}</h5>
                    <div className="question">
                    <div className="reponseImage">
                {row}
                </div>
                </div>
                </div>
                <h4 className ="horloge"><br />{this.props.time}</h4>
            </div>
            )
        }
        if (this.props.quiz.jsonData.slides[this.props.numQuest].hasOwnProperty("asset")){
          
            return  (
                <div className="flex">
                    <div>
                     <h2>{this.props.nick}</h2>
                     <h2>Score:{this.state.score}</h2>
                </div>
                <div className = " ecran">
                <h5 className="title1">{this.props.quiz.jsonData.slides[this.props.numQuest].title}</h5>
                <div className="question">
                <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].asset)} alt=""width = "400px" height = "400px"/>
                <div className="reponse">
            {row}
            </div>
            </div>
            </div>
            <h4 className ="horloge"><br />{this.props.time}</h4>
            </div>
                    )   
        }

        return (
            <div className="flex">
            <div>
            <h2>{this.props.nick}</h2>
            <h2>Score:{this.state.score}</h2>
            </div>  
            <div className = "ecran1">
            <p className="title1">{this.props.quiz.jsonData.slides[this.props.numQuest].title}</p>
            <div className="question">
            <div className="reponseImage">
            {row}
            </div>
             </div>
            </div>
            <h4 className ="horloge"><br />{this.props.time}</h4>
        </div>
               )
    }
}

export default User;