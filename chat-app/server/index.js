const express = require('express')
const app = express();

//1. setup the express server - done
//2. cors and http
const cors = require('cors');
app.use(cors());

const http = require('http');
const server = http.createServer(app);


//3. setting up socket.io
const socket = require("socket.io");

const io = new socket.Server(
    server,
    {
        cors:{
            origin:'*', //we want to allow all origins to use it 
            methods:['GET', 'POST']
        }
    }
)

//4. listen to a connection event 
//document.addEventListener('event-name', callback)
io.on('connection', (socket)=>{
    console.log(`a new user with id ${socket.id} is connected`)
})



app.get("/", (req, res)=>{
    res.send(
        "Welcome to the chat app"
    )
})


server.listen(3000, ()=>{
    console.log("Server is live on http://localhost:3000")
})