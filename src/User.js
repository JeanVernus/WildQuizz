import React from "react";
import Choice from "./Choice.js";
import "./App.css";

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
            return(<div><header>
                <ul id="navbar">
                            <li class="active"><a>WildQuiz</a></li>
                            <li><a >Porfile</a></li>
                            <li><a>Best gamers</a></li>
                    </ul>
                </header>
        
                  <footer>
                    <p>
                                                    
                      WildQuiz
                                                
                    </p>
                  </footer>
            <div className="placement" >
                <p>{this.props.quiz.jsonData.slides[this.props.numQuest].title}</p>
                <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].asset)} />
                {row}
            </div>
            </div>)

        return(<div>
            <header>
            <ul id="navbar">
                        <li class="active"><a>WildQuiz</a></li>
                        <li><a >Porfile</a></li>
                        <li><a>Best gamers</a></li>
                </ul>
            </header>
    
              <footer>
                <p>
                                                
                  WildQuiz
                                            
                </p>
              </footer>
            
        <div className="placement" >
            <p>{this.props.quiz.jsonData.slides[this.props.numQuest].title}</p>
            {row}
        </div>
        </div>)
    }
}

export default User;