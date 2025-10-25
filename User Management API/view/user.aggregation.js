//aggregation pipelines for user collection
const express = require('express');
const router = express.Router();
const User = require('../model/user.model');


// stages of aggregation and their usage with examples

// $match stage -> works exactly like the find() method -> this is used for filtering documents 

//where we want to find the users with age greater than x
// find( {
// age: {
//    $gt:18  }
// })


router.get("/greaterthan/:age", async (req, res)=>{
    try{
    const inputage = req.params.age;

    const users = await User.aggregate(
        [
            //stage 1
            {
                $match:{
                    age: {
                        $gt:Number(inputage)
                    }
                }
            }
        ]
    )
    console.log(users)
    res.json({users})
}
catch(err){
    return res.send(err.message)
}
})

//group stage -> this stage groups the data through specific fields 

//example group the data by roles -> users, admin, superadmin 
//count users in each role 

// project stage -> this stage helps us in deciding, that in what format the data will be displayed


router.get("/getRoles", async (req, res)=>{
    try{
        const pipeline= [
            //stage 1
            {
                $group:{
                    _id:"$role",
                    count:{
                        $sum:1
                    }
                }
            },
            //stage 2
            {
                $project:{

                    //display role instead of id 
                    role:"$_id",
                    count:1, //whenever we want to keep any field in the output we can write field:1
                    //and if we want to remove any field we can write
                    // field:0
                    _id:0
                    
                    //remove the _id field
                }
            }
        ]
        const users = await User.aggregate(
            pipeline
        )
        res.json(users);
    }
    catch(err){
        return res.send(err.message)
    }
})


// sort stage -> whenever we want to sort the data based on values present in a specific field 

//get users sorted by age in descending order 
router.get('/usersAge', async (req, res)=>{
    try{
        const users = await User.aggregate([
            {
                $match:{
                    age:{
                        $gt:18
                    }
                },
            }, {
                $sort:{
                    age:-1
                    //field:value
                    // descending -> value = -1
                    // ascending -> value = 1
                }
            }
            
        ])
        res.json({
            users
        })
    }
    catch(err){
        res.send(err.message)
    }
})

// limit and skip 
//pagination 
router.get("/pages/:pageNumber", async (req, res)=>{
    const limit = 4;
    const page = req.params.pageNumber;
    const skip = (page-1)*limit;

    const users = await User.aggregate([
        {
            $sort:{
                age:1
            }
        },  
        {
            $skip: skip
        },
        {
            $limit:limit
        }
    ])

    res.json(users)
})

module.exports= router;