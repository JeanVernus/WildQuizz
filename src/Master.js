import React from "react"
import "./App.css";
import Quiz from "./Quiz";
import bdd from "./game.json";
import Items1 from "./Items1";
import MessToSend from "./MessToSend";
import socketIOClient from "socket.io-client";



class Master extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            redirectState : 0,
            clientType : "Master",
            message : new MessToSend("","","",""),
            endPoint : "http://192.168.15.60:4002",}
        this.quiz = new Quiz(bdd);


    }
    redirectItem =()=>{

 this.setState({redirectState: 1})
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
    
    if(this.state.redirectState === 1){
        return <Items1 quiz={this.quiz}/>
    }

    
        return(
            <div>
                <input className="bt4" type ="button" value ="SELECT GAMES" onClick={this.redirectItem}/>
                <h1>{this.state.message.objContent}</h1>
            </div>
            )
        }
}
export default Master;