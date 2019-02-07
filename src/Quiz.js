class Quiz{

    constructor (json){
        this.jsonData = json;

    }

    //  fonction qui retourne le nombre de slide game la fonction s'apelle nbGames
    nbGames=()=>{
        // variable qui s'apelle retour et qui est définie à 0
        let retour = 0;
        // une boucle qui s'arrêtte quand elle à parcourue toutes les slides. json.slides.length est égal au nombre total de slides.
        for (let i = 0; i < this.jsonData.slides.length; i++){
            // si l'un des type d'une des slides est égal à la chaine de caractère "game"
            if (this.jsonData.slides[i].type === "game") {
                //ont ajoute 1 à la variable retour.
                retour++;
            }
        }
         //ont retourne retour, c'est à dire que quand ont appelera notre fonction nbGames, elle nous renverra la variable retour.
        return retour;
    }

    // function qui retourne le nombre de slide step dans game < numGame
    // renvoi 0 si numGame est incorrecte
    nbStepInGames=(numGame)=>{
        let retour = 0; 
        let indexGame =0;
        if (numGame < 0) return 0; //si numGame < 0 ont renvoie 0
        if (numGame >= this.nbGames()) return 0; //idem si il est superieur ou égal nbGames
        //ont parcour toutes les slides
        for ( let i =0 ; i < this.jsonData.slides.length; i++){

            if (this.jsonData.slides[i].type!=="game"){// si le contenu de la propriété type est différent de la chaine de caractère "game"
                continue; // ont recommence directement la boucle sans éxecuter les instructions de la boucles dessous
            }
            if (indexGame !== numGame){// si la variable indexGame est différente de numGame
                indexGame ++;// indexGame + 1
                continue;// ont recommence la boucle
            }
            for (let j = i+1; j < this.jsonData.slides.length; j++){// ont parcour toutes les slides 
                if (this.jsonData.slides[j].type==="game"){//quand une des propriétées type de nos slides est égale à "game"
                    //ont renvoie retour
                    return retour;
                }
                // si une des propriétes type de nos slides est égale à "step".
                if (this.jsonData.slides[j].type === "step"){
                    //retour + 1
                    retour++;
                }
            }
            //ont retourne la variable retour
            return retour;
        }
        //ont retourne la variable retour
        return retour;
    }
    nbQuestionInStepInGames=(numGame,numStep)=>{
        let retour = 0;
        let indexGame = 0;
        let indexStep = 0;
        if (numGame < 0) return 0; 
        if (numGame >= this.nbGames()) return 0;
        if (numStep<0) return 0;
        if (numStep >= this.nbStepInGames()) return 0;

        for (let i = 0 ; i < this.jsonData.slides[i]; i ++){
            if (this.jsonData.slides[i].type!=="game"){// si le contenu de la propriété type est différent de la chaine de caractère "game"
                continue; 
            }// ont recommence directement la boucle sans éxecuter les instructions de la boucles dessous
            if (this.jsonData.slides[i].type!=="step"){// si le contenu de la propriété type est différent de la chaine de caractère "step"
                continue; // ont recommence directement la boucle sans éxecuter les instructions de la boucles dessous
            }
            if (indexGame !== numGame){// si la variable indexGame est différente de numGame
                indexGame ++;// indexGame + 1
                continue;// ont recommence la boucle
            }
            if (indexStep !== numStep){// si la variable indexStep est différente de numStep
                indexStep ++;// indexStep + 1
                continue;// ont recommence la boucle
            }
            for (let j = i+1; j < this.jsonData.slides.length; j++){// ont parcour toutes les slides 
                if (this.jsonData.slides[j].type==="game"){//quand une des propriétées type de nos slides est égale à "game"
                    //ont renvoie retour
                    return retour;
                }
                for (let j = i+1; j < this.jsonData.slides.length; j++){// ont parcour toutes les slides 
                    if (this.jsonData.slides[j].type==="step"){//quand une des propriétées type de nos slides est égale à "step"
                         //ont renvoie retour
                        return retour;
                    }
                     if (this.jsonData.slides[j].type === "question"){
                        //retour + 1
                        retour++;
                    }
                }

            }
    
        }
    }
    
    
}
console.log(nbQuestionInStepInGames(1, 3));
export default Quiz;
