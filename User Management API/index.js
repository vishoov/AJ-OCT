const express = require('express');
const app = express();
const userRoutes = require("./view/user.routes")
app.use(express.json());
const mongoose = require('mongoose');
const aggregationRoutes = require('./view/user.aggregation')
// server = mongoose ----URI----DB

const uri= "mongodb+srv://vverma971_db_user:YQur1HImAdcX11Uy@cluster0.exnq8ct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// URI = uniform resource identifier 

//promise 
//sends a promise to the DB -> database verifies from its own end 

mongoose.connect(uri)
.then(()=>{
    console.log("Database is connected")
})
.catch((err)=>err.message)







app.use(userRoutes);

app.get('/', (req, res)=>{
    res.send("Welcome to the user management api")
})

app.use(aggregationRoutes)


app.listen(3000, ()=>{
    console.log("the server is live on http://localhost:3000/")
})