class Player {
    nick = "";
    avatar = "";
    score = "";
    constructor (nick, avatar, score){
        this.nick = nick;
        this.avatar  = avatar;
        this.score = score;
    }

    incscore=()=>{this.score++;}
}
export default Player

