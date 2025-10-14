const express = require('express');
const app = express();




//Routing 

//app.METHOD(path, HANDLER)

app.get('/homePage', (req, res)=>{
    res.send("Welcome to the home page")
})

app.get("/contact", (req, res)=>{
    res.send("Welcome to contact page")
})


// client -----req----->SERVER  -> maps that request's path with the defined routes /home 
//     <--------res-----<


//app -> express instance
//METHOD-> HTTP Method that a request is sent using (GET, POST, PUT, PATCH)
// path -> localhost:3000/path route endpoint that is called for accessing a feature
// HANDLER function -> this is the function that gets executed when a route is matched or called


//fetch('localhost:3000/tasks') -> method 

//root route -> localhost:3000/ 
//GET -> welcome to task manager api
//app.METHOD(path, HANDLER)

app.get('/', (req, res)=>{
    //express.js provides us with req and res objects which are
    //nothing but when a client sends a request, the data sent along with it is referenced by req
    // and whatever response the server sends back that is referenced by res

    res.send("Welcome to the Task Management API")
})



//task management features

// route= /create , method = post, response created successfully
// app.post('/create', (req, res)=>{
//     console.log(req.headers)
//     console.log(req.body)
//     res.send("Task created successfully")
// });


// req -> object is the request data that we can refer to for extracting the information 
app.get("/request", (req, res)=>{
    const body = req.body; //this is the data the we send through a request in the body
    const headers = req.headers; //the configurations of the request like where is it coming from ,what its type
    const ip = req.ip; //sender's ip address
    const protocol = req.protocol;
    const path = req.path; //the path on which req is recieved
    const method = req.method // the method used in the request

    console.log(`body: ${body}, headers : ${headers}, ip: ${ip}, protocol: ${protocol}, path:${path}, method:${method}`)
    res.send(
        "The request object specifications"
    )

})
app.get("/response", (req, res)=>{
    // res.send("This is a plain response") //this is a plain text response
    // res.json({
    //     "message":"This is a json file" })
    // res.sendFile(__dirname+'/index.html')
    // res.status(200).send("Successful")
    // res.redirect('/') 
})


app.use(express.json())
//parsing json files that we reciever from the client

const tasks = [
    {
        id:1,
        title:"Water the plants",
        status:"incomplete"
    }
]

//   /create -> post -> push a new task to the array 
app.post('/create', (req, res)=>{
    const task = req.body;

    tasks.push(task);
    console.log(tasks)
    res.json(tasks)
})

// /tasks -> fetching the whole array get


//update => updating the task based on id


//   /delete  -> delete



//http://domain.com/path 
// /path  - handler function 
// Creating, Reading, Updating, Deleting (CRUD)
// clean, secure and efficient management of Data

// client <=== server ===> DB 



// nodemon -> is a package that restarts the server automatically when we save any changes


app.listen(3000, ()=>{
    console.log(`the server is live on http://localhost:3000/`)
})