
class MessToSend {

    from = "";
    to = "";
    objContent = "";
    timer = "";
    timerTime = 0;

    constructor(from,to,objContent,timer,timerTime){
        this.from =from;
        this.to =to;
        this.objContent= objContent;
        this.timer =timer;
        this.timerTime = timerTime;

    }
}
    export default MessToSend;