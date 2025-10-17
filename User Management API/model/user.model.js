//defining a schema 
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // name,
    name:{
        type:String, //this is the type of the data 
        required:true, //this checks if this data is compulsary or not
    },
    email:{
        type:String,
        required:true,
        unique:true, //this avoids duplicacy of emails 
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user', 'guest', 'admin', 'superadmin']
    }
// email,
// password,
// role => user, guest, admin, superadmin
})


//connecting it to a collection where all the data using that schema will be stored
const User = mongoose.model('User', userSchema);

module.exports = User;