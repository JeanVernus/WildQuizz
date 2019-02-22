import React from "react"
import FichePlayer from "./FichePlayer";
import Player from "./Player";
import "./fiche.css"
import Swal from "sweetalert2";

const defaut = 0;
const activated = 1;
class Formulaire extends React.Component{

constructor(props) {
 
  super(props); 
  
  let avatar="";
  this.state={avatar};
  this.getAvatar = this.getAvatar.bind(this)
  let displaySucess = defaut;
  this.state={displaySucess};
  let displayFiche = defaut;
  this.state={displayFiche};
  let globalPseud = "";
  this.state={globalPseud}
  
  
}



getAvatar(){
  const pseudo = document.getElementById("nickBox").value;
  fetch("https://api.github.com/search/users?q="+pseudo)
  .then((sucess) => sucess.json())
  .then((sucess) => {
//console.log(sucess);
  if (sucess.total_count !== 1) 
  {
    Swal.fire({
      type : "error",
      title : "Oops...",
      text : "Pseudo introuvable"
    })
    this.setState({displaySucess: defaut})
  }
  else{
  this.setState({avatar:sucess.items[0].avatar_url});
  this.setState({displaySucess: activated})
 
  }
//console.log("Avatar: " + this.avatar)
  })
  
  this.setState({globalPseud: document.getElementById("nickBox").value}) 
}
redirectFiche=()=>{
  console.log("ok");
   
  this.setState({displayFiche: activated});
  
  

  
  }

render(){
  

  
    if (this.state.displayFiche === activated){
      let player = new Player(this.state.globalPseud, this.state.avatar, 0)
      return(
       <div>
          <div>
                <header>
          
          <h1>
          <span className="navbar active saumon">W</span>
          <span>ild</span>
          <span className ="saumon">Q</span>
          <span>uiz</span>
          </h1>
    </header>
          <h1 className = "title"> PLAYER</h1>
    
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
      </div>
        <FichePlayer key={"FichePlayer"} source ={player} />
        </div>
      )
    }
    if (this.state.displaySucess === activated){
     
    
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
          <h1 className = "title"> Authentification</h1>
    
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
  
        <div id="boxValidate"><h4 id="txtGetAvatar">Avatar récupéré avec succès</h4>
        <div className="div-button"> <input className="authButton"type="button" onClick={this.redirectFiche} value="Afficher la fiche player"/></div></div>
        </div>
      )
    }
  return(<div>
    <div>
    <div>
                <header>
          
          <h1>
          <span className="navbar active saumon">W</span>
          <span>ild</span>
          <span className ="saumon">Q</span>
          <span>uiz</span>
          </h1>
    </header>
          <h1 className = "title"> Rejoindre un salon</h1>
    
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
      </div>
    
    </div>
    <div id="IdentificatorGithub">
    <img id="IconGithub" src="https://img.icons8.com/windows/104/000000/github.png"alt =""/>
    <h3>Identifiez vous avec Github</h3>
    <div id="centerIdentificator">
    <input id="nickBox" type="text"/>
      <input value="Rechercher le profil" type="button" onClick={this.getAvatar }/>
    </div>
    </div>
  </div>
    
  )
}

}
export default Formulaire

