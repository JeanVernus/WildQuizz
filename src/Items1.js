import React from 'react';
import MessToSend from './MessToSend';
import socketIOClient from "socket.io-client";
import {ENDPOINT} from "./const";


class Items1 extends React.Component{
    constructor(props){
    super(props);
    this.state = {tableGamesIndex: [], 
                 tableGamesState : [], 
                 tableStepState : [],
                 functionNbGames : "not called",
                 tableStepIndex: [],
                 tableQuestionsIndex : [],
                 tableQuestionsState : [],
                 clientType : "Master",
                 message : new MessToSend("","","",""),
                 endPoint : ENDPOINT, 
                 choosenTime : 0,
                 count : 0,
                 choiceArray : [],
                 isQuestChoose : "no",
                 answerPlayerAvatar : [],
                 displayAnswerAndAvatar: [],
                }
            }
    
    /*Socket.io part*/

    send=(value)=>{
        let instance = new MessToSend(this.state.clientType,"Master",value,"on",this.state.choosenTime)
        const socket = socketIOClient(this.state.endPoint)
        socket.emit("objet", JSON.stringify(instance))
        //console.log(JSON.stringify(instance));
}
    componentDidMount(){
        const socket = socketIOClient(this.state.endPoint);
        socket.on("objet",(obj)=>{
    //    console.log("message received!!");
        let receivedObj = JSON.parse(obj)
        this.setState({message : receivedObj});
        if (this.state.message.timer === "on"){
            this.timer(this.state.choosenTime);
        }
    })
        socket.on("answer",(obj)=>{
            let receivedObj = JSON.parse(obj)
            // console.log(obj)
            // console.log(receivedObj.answer)
            // console.log([receivedObj.avatar])
            var newResponse = {"answer":receivedObj.answer, "avatar":receivedObj.avatar }
                console.log(newResponse);
            
            const existingResponse = this.state.answerPlayerAvatar.find(item => item.avatar === newResponse.avatar)
            let newAnswerPlayerAvatar
                if (existingResponse){
                    newAnswerPlayerAvatar = this.state.answerPlayerAvatar.map(
                        item => {
                            if(item.avatar === newResponse.avatar){
                                return newResponse
                            }
                            else{
                                return item
                            }
                        }
                    )
                    
                }
                else{
                     newAnswerPlayerAvatar = this.state.answerPlayerAvatar.concat([newResponse])
                    
                }
                this.setState({answerPlayerAvatar : newAnswerPlayerAvatar})
            // this.addAvatar();

            // console.log("voici le state",this.state);
            // console.log(this.state.answerPlayerAvatar)
    
    })
}
    /////////////////////////////////////////////////
    

    timer=(value)=>{
        this.setState({count : value})
        let subOneSec = ()=>{
            if(this.state.count>0){
                this.setState({count : this.state.count -1})
                
                
            }
            else if (isNaN(this.state.count)){
                console.log("caca");
                
            }
            else {
                clearInterval(setInterVar)
            }
        }
        var setInterVar = setInterval(subOneSec,1000)
    }


        addAvatar=()=>{
            console.log(this.state.choiceArray[0].props.children.props.children);
            for(let i = 0; i < this.state.answerPlayerAvatar.length ; i ++){
                for( let j = 0; j < this.state.choiceArray.length; j ++){
                    if (this.state.answerPlayerAvatar[i].answer === this.state.choiceArray[j].props.children.props.children){
                        
                        // console.log(this.state.answerPlayerAvatar[i].answer);
                        // console.log(this.state.choiceArray[j].props.children);
                        let answer = document.getElementById(this.state.answerPlayerAvatar[i].answer)//on récupère l'élément html qui a pour Id la réponse//
                        //let tagName = answer.getElementById("tailleImageReponse");
                        //answer.removeChild(tagName)
                        // console.log(answer);
                        // console.log(img);
                        let img = document.createElement("img")
                        console.log(img);
                        img.id = "tailleImageReponse"
                        console.log(img.id);
                        
                        img.src = (this.state.answerPlayerAvatar[i].avatar)
                        console.log(img.src);
                        
                        answer.appendChild(img)
                        
                
                    }
                }
            }
            
        }
    
    choiceQuestions=()=>{
        this.setState({answerPlayerAvatar:[]})
        let selectBoxClassName = document.getElementById('optionElt2')
        let selectedValue = parseInt(selectBoxClassName.value);
        // console.log(selectedValue);
        this.setState({choosenQuestions: selectedValue})
        //console.log(selectedValue);
        
        this.send(selectedValue)
        this.displayChoices(parseInt(selectedValue))
    }
    
    displayChoices =(indexQuestion)=>{
        //console.log(this.state);
        
        this.setState({choiceArray : []})
        
        this.setState({choiceArray : this.props.quiz.jsonData.slides[indexQuestion].choices});
        //console.log(this.state.choiceArray[0].item[0].text);
        this.setState({isQuestChoose: "yes"})
        
    }

    choiceGame=()=>{
        this.setState({tableStepIndex:[]})
        let selectBoxClassName = document.getElementById('optionElt')
        let selectedValue = parseInt(selectBoxClassName.value);
        // console.log(selectedValue);
        this.displaySteps(selectedValue);
        
    }
    choiceSteps=()=>{
        this.setState({tableQuestionsIndex:[]})
        let selectBoxClassName = document.getElementById('optionElt1')
        let selectedValue = parseInt(selectBoxClassName.value);
        // console.log(selectedValue);
        this.displayQuestions(selectedValue);
    }

    displaySteps=(gameValue)=>{
       // console.log("tate: "+gameValue);
        for (let i = gameValue + 1;i < this.props.quiz.jsonData.slides.length;i++ ){
            
            if (this.props.quiz.jsonData.slides[i].type === "step") {
                this.state.tableStepIndex.push(i);
                //console.log("step ajouté au tableau");
            }
            if (this.props.quiz.jsonData.slides[i].type === "game"){
                //console.log("game trouvé");
                break;
            }
        }
    let tableSteps = this.state.tableStepIndex.map((indexSteps)=>{
        return (<option className ="bt0" value={indexSteps} >{this.props.quiz.jsonData.slides[indexSteps].title}</option>)
    })
    this.setState({tableStepState : tableSteps}); 
         //console.log("tab step: "+this.state.tableStepIndex);
    }

    displayQuestions=(stepValue)=>{
       // console.log("in Question");
        
        // console.log("tate: "+gameValue);
         for (let i = stepValue + 1;i < this.props.quiz.jsonData.slides.length;i++ ){
             
             if (this.props.quiz.jsonData.slides[i].type === "question") {
                 this.state.tableQuestionsIndex.push(i);
                 //console.log("step ajouté au tableau");
             }
             if (this.props.quiz.jsonData.slides[i].type === "step"){
                 //console.log("game trouvé");
                 break;
             }
         }
     let tableQuestions = this.state.tableQuestionsIndex.map((indexQuestions)=>{
         return (<option className ="bt0" value={indexQuestions} >{this.props.quiz.jsonData.slides[indexQuestions].title}</option>)
     })
     this.setState({tableQuestionsState : tableQuestions}); 
     //console.log("tab step: "+this.state.tableQuestionsState);
          
     }
    
    nbGames=()=>{
    let retour = 0;
        for (let i = 0; i < this.props.quiz.jsonData.slides.length; i++){
            if (this.props.quiz.jsonData.slides[i].type === "game") {
                retour++;
                this.state.tableGamesIndex.push(i);
            }
        }
        
    let tableGames = this.state.tableGamesIndex.map((indexGames)=>{
        return (<option className ="bt0" value={indexGames} >{this.props.quiz.jsonData.slides[indexGames].title}</option>)
    })
    this.setState({tableGamesState : tableGames}); 
    this.setState({functionNbGames : "called"})
        return retour;
    }

    timerChange=()=>{
        let selectBoxid=document.getElementById("boxTime");
        let selectedValue=parseInt(selectBoxid.value);
        this.setState({choosenTime:selectedValue});
        
    }



    render(){
        if (this.state.isQuestChoose === "yes"){
            return (
                <div>
                    
                <header>
          
              <h1>
              <span className="navbar active saumon">W</span>
              <span>ild</span>
              <span className ="saumon">Q</span>
              <span>uiz</span>
              </h1>
        </header>
              <h1 className = "title"> MASTER</h1>
        
      <div>

      </div>
          <footer>
         <h3>
           <span className="saumon">W</span>
              <span>ild</span>
              <span className ="saumon">Q</span>
              <span>uiz</span>
        </h3> 
          </footer>
          <div className ="flex1">
    <div className ="displayHorloge">
                <select onChange={this.timerChange}id="boxTime">
                    <option>Lancer timer</option>
                    <option>60 secondes</option>
                    <option>50 secondes</option>
                    <option>40 secondes</option>
                    <option>30 secondes</option>
                    <option>20 secondes</option>
                    <option>10 secondes</option> 
                </select>
                <h4 className = "horloge1"><br />{this.state.count}</h4>
    </div>
    <div className="cssChoiceQuestions">
    <div className="cssJustChoices">
    <select onChange ={this.choiceGame} id="optionElt" className="">
                    <option>Modes de jeux</option>
                        {this.state.tableGamesState}
                </select><br /><br />
                <select onChange ={this.choiceSteps} id="optionElt1" className="">
                    <option>Thèmes</option>
                        {this.state.tableStepState}
                </select><br /><br />
                <select  onChange ={this.choiceQuestions} id="optionElt2"className="">
                    <option>Questions</option>
                        {this.state.tableQuestionsState}
                </select>
    </div>
    
            <div className = "cssChoice">
            <div>
                <h2>REPONSES</h2>
            </div>
                    {this.state.choiceArray.map((choice)=>{
          //console.log(this.buildAvatar(item));
            ;
            return(

                <div id={choice.text}>
                <p>{choice.text}</p>
                {
                    this.state.answerPlayerAvatar.filter(item=>item.answer === choice.text)
                    .map(item=> <img id = "tailleImageReponse"src={item.avatar} alt  = ""/>)
                }
                </div>
            )
        })}
                    </div>
                    </div>
                    </div>
                </div>
            )
        }
        //console.log("tab step: "+this.state.tableQuestionsState);
    
        if (this.state.functionNbGames === "not called"){
            this.nbGames()
        }
    // console.log(this.state.tableGamesState)
        return(
    <div>
                <header>
          
              <h1>
              <span className="navbar active saumon">W</span>
              <span>ild</span>
              <span className ="saumon">Q</span>
              <span>uiz</span>
              </h1>
        </header>
              <h1 className = "title"> MASTER</h1>
        
      <div>

      </div>
          <footer>
         <h3>
           <span className="saumon">W</span>
              <span>ild</span>
              <span className ="saumon">Q</span>
              <span>uiz</span>
        </h3> 
          </footer>
            <div className ="flex1">
    <div className ="displayHorloge">
                <select className="centerText"onChange={this.timerChange}id="boxTime">
                    <option>Lancer timer</option>
                    <option>60 secondes</option>
                    <option>50 secondes</option>
                    <option>40 secondes</option>
                    <option>30 secondes</option>
                    <option>20 secondes</option>
                    <option>10 secondes</option> 
                </select>
                <h4 className = "horloge1"><br />{this.state.count}</h4>
    </div>
    <div>
                <select className="centerText"onChange ={this.choiceGame} id="optionElt" >
                    <option>Modes de jeux</option>
                        {this.state.tableGamesState}
                </select><br /><br />
                <select className="centerText"onChange ={this.choiceSteps} id="optionElt1">
                    <option>Thèmes</option>
                        {this.state.tableStepState}
                </select><br /><br />
                <select className="centerText" onChange ={this.choiceQuestions} id="optionElt2">
                    <option>Questions</option>
                        {this.state.tableQuestionsState}
                </select>
    </div>
            </div>
    </div>

        )
    }
}
export default Items1;