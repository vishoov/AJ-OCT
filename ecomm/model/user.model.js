const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
// Id:string,
name:{
    type:String,
    required:true,
    minLength:5,
    maxLength:50
},
// 	Name:string,
// Age:number,
age:{
    type:Number,
    min:[10, "You are too young to be using a phone"],
    max:[100, "You are too old to be using a phone"]
},
email:{
    type:String,
    required:true,
    unique:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Your email is not correct"]
},
// Email:string,
// Address:string,
address:{
    type:String,
    required:true
},
// Contact:number,
contact:{
    type:Number,
    min:1000000000,
    max:9999999999
},
role:{
    type:String,
    enum:["user", "admin", "superadmin"],
    default:"user"
},
password:{
    type:String,
    required:true,
    match:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
}
// Role:”user”, “admin”, -> role based authentication 
// Password:string
},{
    timestamps:true
})


const User = mongoose.model("User", userSchema)


module.exports = User

