const express = require('express');
const app = express();
const morgan = require('morgan')


app.get("/", (req, res)=>{
    res.send("Welcome to the middlewares code tutorial")
})

app.use(morgan('dev'))
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

app.get("/route", (req, res)=>{
    res.send("No middleware applied")
})

//1. application level middlewares 
app.use(middlewareA); //line 28

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

// app.use(passkeyCheck)


app.use(middlewareB);

app.get("/test", (req, res)=>{
    console.log("Test route handler reached")
    res.send("test route handler reached")
})



//2. Router level middleware which helps us in writin routes in different files
// const router = express.Router(); -> router is the router level middleware
//refer to file -> modular.routes.js in routes folder

app.post("/beforejson", (req, res)=>{
    const body = req.body;
    console.log(body);
    res.send("This route is defined before the express.json() function")
})


//3. Built in middlewares 
app.use(express.json()) //this built in middleware provided to us by express is used to parse incoming json files from the client side 

app.post("/afterjson", (req, res)=>{
    const body = req.body;
    console.log(body);
    res.send("This route is defined after the express.json() function")
})



// Modular Programming in Javascript
// single threaded -> the more lines of js we write, the more time it takes to compile them
// in order to make our code efficient, break that code into smaller chunks 
// implementing code on demand feature 


//4. third party middlewares 
// const morgan = require('morgan')
//Logging middleware -> whatever requests come to your server, we need to keep them in record
// app.use(morgan('dev'))


//5. Custom middleware 
//example : passkeyCheck is a custom middleware because we have decided what happens in it


//6. ROUTE SPECIFIC MIDDLEWARE
const specificMW = (req, res, next)=>{
    console.log("This is a middleware that is implemented only on specific route");
    next();
}



app.get("/specificRoute", specificMW, (req, res)=>{
    res.send("Specific route executed")
})

app.get("/moreroute", (req, res)=>{
    res.send("more routes")
})



app.listen(3000, ()=>{
    console.log("The server is live on http://localhost:3000")
})


//Middlewares Execution Flow
//1. Middlewares are called sequentially in the order they are defined in 
// 2. Each middleware can either:
    // - End the request-response cycle
    // - Pass on to next middleware after it
// 3. The final route handler should eventually be called