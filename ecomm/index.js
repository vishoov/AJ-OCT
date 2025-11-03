const express = require('express')
const app = express()

const userRoutes = require("./view/user.view")
const uri = "mongodb+srv://vverma971_db_user:Iygu1RXgKrPmhnJr@cluster0.tcnoggx.mongodb.net/?appName=Cluster0"

// database connection
const mongoose = require('mongoose')

mongoose.connect(uri)
.then(()=>{
    console.log("Connected to DB")
})
.catch((err)=>{
    console.log(err.message)
})

app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Welcome to the ecommerce server")
})

app.use("/v1", userRoutes)


app.listen(3000, ()=>{
    console.log("connected to server at http://localhost:3000/")
})