import React from 'react';




class Items extends React.Component{
    constructor(props){
    super(props);

    }
    


    render(){

        return(
            <div className="img_reponse">
                    
                <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].choices[0].asset)}></img>{this.props.quiz.jsonData.slides[this.props.numQuest].choices[0].text}
                <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].choices[1].asset)}></img>{this.props.quiz.jsonData.slides[this.props.numQuest].choices[1].text}<br />
                <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].choices[2].asset)}></img>{this.props.quiz.jsonData.slides[this.props.numQuest].choices[2].text}
                <img src={require("./"+this.props.quiz.jsonData.slides[this.props.numQuest].choices[3].asset)}></img>{this.props.quiz.jsonData.slides[this.props.numQuest].choices[3].text}<br />
                   
            </div>

        )
    }
}
export default Items;