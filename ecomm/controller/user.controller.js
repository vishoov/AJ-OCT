const User = require("../model/user.model")



const signup = async (req, res)=>{
    try{
        const user = req.body;

        const newUser = await User.create(user);

        if(!newUser){
            res.status(400).json({
                message:"User Couldnt be created"
            })
        }

        res.status(201).json({
            message:"User created successfully",
            newUser
        })

    }
    catch(err){
        res.send(err.message)
    }
}

const login = async (req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            res.send(
                "Email and Password both are required"
            )
        }

        const user = await User.findOne({email});

        if(!user){
            res.send("No user exists")
        }

        if(password!==user.password){
            res.send("The password is incorrect")
        }
//error first approach

        res.status(200).json({
            message:"User logged in successfully",
            user
        })

    }
    catch(err){
        res.send(err.message)
    }
}

const allusers = async (req, res)=>{
    try{
        const users = await User.find();

        res.json({
            users
        })
    }
    catch(err){
        res.send(err.message)
    }
}

const profile = async (req, res)=>{
    try{
        const id = req.params.id;

        const user = await User.findOne({_id:id});

        if(!user){
            res.send("User doesnt exist")
        }

        res.json({
            user
        })
    }
    catch(err){
        res.send(err.message)
    }
}

const updatepass = async (req, res)=>{
    try{
        const id = req.params.id;
        const {
            password, 
            newpassword
        } = req.body
        const user = await User.findOne({_id:id});

        if(!user){
            res.send("The user doesnt exist")
        }

        if(user.password!==password){
            res.send("You have entered incorrect password")
        }

        user.password = newpassword
        await user.save();

        res.json({
            message:"Password updated successfully",
            user
        })
    }
    catch(err){
        res.send(err.message)
    }
}

module.exports = {
    signup,
    login,
    allusers,
    profile,
    updatepass
}