const express = require ("express");
const http = require ('http');
const socketIO = require ('socket.io');
const port = 4002;

const app =  express();
const server = http.createServer(app)
const io = socketIO(server)

io.on ("connection", socket=>{
    console.log("new client connected");
    socket.on ("objet",(obj)=>{
        console.log("object received: "+obj)
        io.emit("objet", obj)
    })
    
    socket.on("error",function(err){
        console.log(err);
        
    })
    
    socket.on('disconnect',()=>{
        console.log("user disconnected");
        
    })
})
server.listen(port,()=>console.log("listening on port: "+ port))
