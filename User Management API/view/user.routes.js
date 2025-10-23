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
    //mongoose way
    // const userData = await User.create(data);

    //OOP way
    const userData = new User(data);
    await userData.save();

    res.json({
        message:"User created",
        userData
    })
})
//login
router.post('/login', async (req, res)=>{
    try{
    const { email, password } = req.body;

    const data= await User.findOne({
            email:email
        })

console.log(data)

    if(data.password!==password){
        return res.status(400).send("Password is incorrect")
    }
  

    res.json({
        message:"You have successfully logged in",
        data
    })
    }
    catch(err){
        return res.send(err.message)
    }
})

// router.get("/getByUsername/:username", )
//username 


//users/
router.get("/users", async (req, res)=>{
    try{
    const users = await User.find();

    res.json(
        {
            users
        }
    )
}
catch(err){
    return res.status(400).send(err.message)
}
})


// /users/:id
router.get("/users/id", async (req, res)=>{
    const { id } = req.query;

    // const user = await User.findOne({
    //     _id:id
    // })

    //quick indexing 

    const user = await User.findById(id)

    if(!user){
        return res.status(404).send("User not found");
    }

    res.status(200).json({
        user
    })

})



//DELETE users/:id
router.delete("/users/:id", async (req, res)=>{
    
    const user = await User.findByIdAndDelete(req.params.id);

    res.json({
        user,
        message:"User deleted successfully"
    })

})




//adult users (age>18)
router.get("/adultUsers", async (req, res)=>{
    try{
        const users = await User.find({
            age: {
                $gt : 18
            }
        })

        res.json(
            users
        )
    }
    catch(err){
        return res.send(err.message)
    }
})

router.get("/userswithadmin", async (req, res)=>{
    try{
        const users = await User.find(
            {
                role: {
                    $in: ["user"]
                }
            }
        )

        res.json(users)
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})

router.get('/userfifty', async (req, res)=>{
    try{
        // const age = 30 
        // const role = 'admin';
        const users = await User.find(
            {
                $and :[
                    { age: 50 },
                    { role:'user' }
                ]
            }
        )
        return res.json(users)
    }
    catch(err){
        return res.status(400).send(err.message)
    }
})

router.put('/updateOne', async (req, res)=>{
    try{
        const { username, newEmail } = req.body;

        const updatedUser = await User.findOneAndUpdate(
            //1. filtering condition 
            {
                username:username
            },
            //2. add the new info
            {
                $set:{
                    email:newEmail
                }
            },
            {
                new:true //this will send the updated document 
            }
        )
        return res.json(updatedUser)
    }
    catch(err){
        return res.json(err.message)
    }
})

router.put("/findById/:id", async (req, res)=>{
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(
        id,
        {
            role:"admin"
        },
        {
            new:true
        }
    )

    res.json(user)
})

router.delete('/deletebyemail', async (req, res)=>{
    const email = req.body.email;

    const userDeleted = await User.deleteOne(
        {
            email:email
        }
    )

    res.json({
        message:"User deleted",
        userDeleted
    })
})


module.exports=router;