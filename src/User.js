import React from "react";
import Choice from "./Choice.js";

class User extends React.Component{
    constructor(props){
        super (props)
    }

    render(){
        let row = [];
        console.log(row);
        
        let pluscourt=this.props.quiz.jsonData.slides[this.props.numQuest];
        // console.log("ci dessous: ");
        
        // console.log(pluscourt);

        

       
        for (let i=0; i < pluscourt.choices.length; i ++){
            row.push (<Choice num={this.props.quiz.jsonData.slides[this.props.numQuest].choices[i]} />);
        }
        if (row[0].props.num.hasOwnProperty("asset")) {
            if (this.props.quiz.jsonData.slides[this.props.numQuest].hasOwnProperty("asset")){
                return(<div>
                    <p className="title">{this.props.quiz.jsonData.slides[this.props.numQuest].title}</p>
                    <div className="question">
                    <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].asset)} alt=""/>
                    <div className="reponseImage">
                {row}
                </div>
                    </div>
                </div>)}
    
            return(<div>
                <p className="title">{this.props.quiz.jsonData.slides[this.props.numQuest].title}</p>
                <div className="question">
                <div className="reponseImage">
                {row}
                </div>
                 </div>
            </div>)
            
            
            
        }
        if (this.props.quiz.jsonData.slides[this.props.numQuest].hasOwnProperty("asset")){
            return(<div>
                <p className="title"className="title">{this.props.quiz.jsonData.slides[this.props.numQuest].title}</p>
                <div className="question">
                <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].asset)} alt=""/>
                <div className="reponse">
            {row}
            </div>
                </div>
            </div>)}

        return(<div>
            <p className="title">{this.props.quiz.jsonData.slides[this.props.numQuest].title}</p>
            <div className="question">
            <div className="reponse">
            {row}
            </div>
             </div>
        </div>)
    }
}

export default User;