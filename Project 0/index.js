//step 1 import express
const express = require('express');

//step 2 an app instance = server
const app = express();

//route 
//document.addEventListenrr('event-name', ()=>{})
app.get("/", (req, res)=>{

    res.send("Welcome to our server")
})

//anynewroutecomeshere

//port listener 
//document.addEventListener('event-name', callbackFunction);
app.listen(3000, ()=>{
    console.log("The server is live on http://localhost:3000/")
})