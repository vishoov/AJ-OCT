//defining a schema 
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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
        match:/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/,
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

//just before data is being sent to the DB we will encrypt the password
//validation -> pre.save -> the data is sent to DB 
userSchema.pre('save', async function(next){
        try{
            //user -> extracting the password -> encrypt it -> save the encrypted password to DB
            //signs up -> model validate -> encrypt the data -> saved to DB 
            //salt = the string that we add to the password to make it even more impossible to be cracked
            // const salt = "thisismycustomsaltandiamusingitforsecurity";
            const salt = await bcrypt.genSalt(10);
            //genSalt(number)-> creates a salt string of 10 rounds 
            const hashedPassword = await bcrypt.hash(this.password, salt);

            this.password = hashedPassword
            next();
            //bcrypt.hash function creates a hashed password using original password and salt 
        }
        catch(err){
            throw new Error(err.message);
        }
    }
)
//schema.pre -> this is an event listener that implements a callback function before an event 
//save -> this is the event when the data is saved in DB

//method to compare the encrypted password
//whenevr we want to create any custom method for hte Schema we can use
//Schema.methods.methodName = function(){}
// class.prototype.function
userSchema.methods.comparePassword = async function(plainPassword){
    try{
        //bcrypt.compare function is provided by bcrypt that helps in comparing plain password with encrypted password because the password was encrypted by bcrypt only and only bcrypt knows how it was encrypted 
        return await bcrypt.compare(plainPassword, this.password)
        //returns a boolean value
        // true if the passwords match
        //and false if they dont 
    }
    catch(err){
        throw err
    }
}



//connecting it to a collection where all the data using that schema will be stored

const User = mongoose.model('User', userSchema);

module.exports = User;