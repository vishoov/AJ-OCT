//defining a schema 
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // name,
    username:{
        type:String, //this is the type of the data 
        required:true, //this checks if this data is compulsary or not
        //smallcase, uppercase or number -> alpha-numeric type of data 
        validate:{
            validator:function(arg){
                return /^[a-zA-Z0-9]+$/.test(arg);
            },
            message: props => `${props.value} is not a valid username`
        },
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true, //this avoids duplicacy of emails 
        match:/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ 
    },
    password:{
        type:String,
        required:true,
        minLength:[8,'This is a custom error written by me, that says please enter a longer password'],
        maxLength:20,
        match:/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
        select:true //it will not send password whenever we fetch any user data from the DB
    },
    role:{
        type:String,
        enum:['user', 'guest', 'admin', 'superadmin']
    },
    age:{
        //only for adults and for people less than 60 years of age, compulsary 
        type:Number,
        min:18,
        max:60,
        required:[true, "Without age, you cannot signup"]

    }
// email,
// password,
// role => user, guest, admin, superadmin
})


//connecting it to a collection where all the data using that schema will be stored

const User = mongoose.model('User', userSchema);

module.exports = User;