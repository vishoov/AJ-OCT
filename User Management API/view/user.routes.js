const express = require('express');
const router = express.Router();
const User= require('../model/user.model')
// const users = [
//     {
//         id:1,
//         name:"Vishoo",
//         email:"vishooverma@acciojob.com",
//         password:"hahaha123",
//         age:10
//     }
// ]

//register
router.post("/register", async (req, res)=>{
    const data = req.body;

    // users.push(data);
    const userData = await User.create(data);

    res.json({
        message:"User created",
        userData
    })
})
//login
router.post('/login', (req, res)=>{
    const { email, password } = req.body;

    const data = users.find((user)=>{
        return email === user.email
    })


    if(data.password!==password){
        return res.status(400).send("Password is incorrect")
    }
  

    res.json({
        message:"You have successfully logged in",
        data
    })
})

//users/
router.get("/users", (req, res)=>{

})
// /users/:id
router.get("/users/:id", (req, res)=>{

})
//DELETE users/:id
router.delete("/users/:id", (req, res)=>{

})




module.exports=router;