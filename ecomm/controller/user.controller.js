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


module.exports = {
    signup
}