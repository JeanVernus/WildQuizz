import React from "react";
import Choice from "./Choice.js";

class User extends React.Component{
    constructor(props){
        super (props)
    }

    render(){
        let row = [];
        let pluscourt=this.props.quiz.jsonData.slides[this.props.numQuest];

       
        for (let i=0; i < pluscourt.choices.length; i ++){
            row.push (<Choice num={this.props.quiz.jsonData.slides[this.props.numQuest].choices[i]} />);
        }
        if (this.props.quiz.jsonData.slides[this.props.numQuest].hasOwnProperty("asset"))
            return(<div>
                <p>{this.props.quiz.jsonData.slides[this.props.numQuest].title}</p>
                <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].asset)} />
                {row}
            </div>)

        return(<div>
            <p>{this.props.quiz.jsonData.slides[this.props.numQuest].title}</p>
            {row}
        </div>)
    }
}

export default User;