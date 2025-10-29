const express = require('express');
const app = express();
const userRoutes = require("./view/user.routes")
app.use(express.json());
const mongoose = require('mongoose');
const aggregationRoutes = require('./view/user.aggregation')
// server = mongoose ----URI----DB
const rateLimiter = require('./Security/RateLimiting')

//logger security
const { loggerMiddleware } = require('./Security/Logging');

app.use(loggerMiddleware)


//dotenv usage
const dotenv = require("dotenv");
dotenv.config();

const uri= process.env.MONGO_URI;
// URI = uniform resource identifier 


//promise 
//sends a promise to the DB -> database verifies from its own end 

mongoose.connect(uri)
.then(()=>{
    console.log("Database is connected")
})
.catch((err)=>err.message)


//middleware for logging the requests 



app.use(rateLimiter);
app.use(userRoutes);

app.get('/', (req, res)=>{
    console.log("Headers:", req.headers)
    res.send("Welcome to the user management api")
})

app.use(aggregationRoutes)


app.listen(3000, ()=>{
    console.log("the server is live on http://localhost:3000/")
})