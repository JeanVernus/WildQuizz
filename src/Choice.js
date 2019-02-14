import React from "react";

class Choice extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        if (this.props.num.hasOwnProperty("asset"))
            return(<div>
                <p className ="repospace">{this.props.num.text}</p>
                <img src={require("./"+this.props.num.asset)} alt=""/>
                
            </div>)
        return (<div>
            <p className ="repospace">{this.props.num.text}</p>
        </div>)
        
       
    }
    


}

export default Choice;