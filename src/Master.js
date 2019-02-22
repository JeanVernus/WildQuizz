import React from "react"
import Quiz from "./Quiz";
import bdd from "./game.json";
import MessToSend from "./MessToSend";
import socketIOClient from "socket.io-client";
import {ENDPOINT} from "./const";



class Master extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clientType : "Master",
            message : new MessToSend("","","",""),
            endPoint : ENDPOINT,}
        this.quiz = new Quiz(bdd);


    }
 

    componentDidMount(){
    const socket = socketIOClient(this.state.endPoint)
    socket.on("objet",(obj)=>{
        console.log("ok");
    var receivedObj = JSON.parse(obj);
    this.setState({message : receivedObj})    
    })
    }

    render(){
    console.log(this.state.message);
    

    
        return(
            <div>
                <h4>{this.state.message.objContent}</h4>
            </div>
            )
        }
}
export default Master;