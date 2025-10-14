const express = require('express');
const app = express();


app.get("/", (req, res)=>{
    res.send("Welcome to the middlewares code tutorial")
})

// Middlewares in backend development is a function that gets executed exactly in middle of the request-response cycle
//after we recieve a request on the server
//and before the handler function for that route is called
// Middlewares have access to the req and res objects 

//What exactly middlewares can do?
// Execute any code during the request lifecycle
// Modify request and response objects meaning that it can access information and send response and errors
// End the request-response cycle before the handler by sending a response
// it can approve a request to move further to either next middleware or the route handler using the next() keyword

const middlewareA = (req, res, next)=>{
    console.log("Middleware A Executed!!")
    next();
    
    //next keyword tells the server that the executed of this middleware has completed
}

//1. application level middlewares 
app.use(middlewareA);

//app.use() will implement the middlewareA for all the routes that are coming after this execution

const middlewareB= (req, res, next)=>{
    console.log("Middleware B Executed");
    next();
}

//middleware where the middleware will be checking for a passcode
//query parameter => passcode 
//http://localhost:3000/test?passcode=acciojob
// acciojob
//route handler 
//response you are not authorised

const passkeyCheck = (req, res, next) =>{
    const passcode= req.query.passcode;

    if(passcode==="acciojob"){
        console.log("Access Granted")
        next()
    }else{
        return res.status(500).json({
            message:"You are not authorized"
        })
    }
}

app.use(passkeyCheck)


app.use(middlewareB);

app.get("/test", (req, res)=>{
    console.log("Test route handler reached")
    res.send("test route handler reached")
})


app.listen(3000, ()=>{
    console.log("The server is live on http://localhost:3000")
})