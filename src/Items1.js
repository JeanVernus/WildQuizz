import React from 'react';




class Items1 extends React.Component{
    constructor(props){
    super(props);
    let items = "";
    this.state = {items};
    }
    


    render(){

        return(
            <div>
                
                <p className="texte4"> <br /><br />
                    <ul>
                <li>{this.props.quiz.jsonData.slides[this.props.numQuest].choices[0].text}</li><br />
                <li>{this.props.quiz.jsonData.slides[this.props.numQuest].choices[1].text}</li><br />
                <li>{this.props.quiz.jsonData.slides[this.props.numQuest].choices[2].text}</li><br />
                <li>{this.props.quiz.jsonData.slides[this.props.numQuest].choices[3].text}</li><br />
                   </ul>
                </p>
            </div>

        )
    }
}
export default Items1;