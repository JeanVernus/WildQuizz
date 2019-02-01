import React from "react"
import Player from "./Player"
import "./fiche.css"


class FichePlayer extends React.Component{
    constructor(props){
        super(props);
        let imgSrc = "";
        let playerName = "";
        let playerScore = 0;
        this.state = {imgSrc}
        
    }
    
    render(){
        
        return(
            
            <div id="boxFichePlayer">
                <div> <img src={this.props.source.avatar} alt="re"/>
                <h1>{this.props.source.nick}</h1></div>
                <h2>Score: {this.props.source.score}</h2>
                
               
            </div>
        )
    }
}
export default FichePlayer