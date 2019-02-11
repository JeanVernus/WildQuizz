import React from "react";

class Choice extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        if (this.props.num.hasOwnProperty("asset"))
            return(<div>
                <p>{this.props.num.text}</p>
                <img src={require("./"+this.props.num.asset)} />
                
            </div>)
        return (<div>
            <p>{this.props.num.text}</p>
        </div>)
        
       
    }
    


}

export default Choice;
