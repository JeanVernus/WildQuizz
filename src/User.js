import React from "react";
import Choice from "./Choice.js";

class User extends React.Component{
    constructor(props){
        super(props);

        this.state={
            score:0,
        }
    }
    
    onUpdateScorePlayer=(score)=>{
        this.setState({score})
    }

    render(){
        let row = [];
        
        
        let pluscourt=this.props.quiz.jsonData.slides[this.props.numQuest];
        // console.log("ci dessous: ");
        
        // console.log(pluscourt);

        
        
       
        for (let i=0; i < pluscourt.choices.length; i ++){
            row.push (<Choice score={this.state.score} onUpdateScorePlayer={(score) =>this.onUpdateScorePlayer(score)} clock={this.props.time}  key ={i} num={this.props.quiz.jsonData.slides[this.props.numQuest].choices[i]} avatar={this.props.avat} />);
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
                <h4 className ="horloge"><br />00 : {this.props.time}</h4>
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
                <h4 className ="horloge"><br />00 : {this.props.time}</h4>
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
            <h4 className ="horloge"><br />00 : {this.props.time}</h4>
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
            <h4 className ="horloge"><br />00 : {this.props.time}</h4>
        </div>
               )
    }
}

export default User;