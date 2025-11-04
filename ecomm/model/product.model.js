const mongoose= require('mongoose');


const productSchema = mongoose.Schema({
    
// 	id:string,

// 	Name:string,
name:{
    type:String,
    requied:true
},
// description:string,
description:{
    type:String,
    required:true,
    minLength:10,
    maxLength:5000
},
// Costprice:number,
costprice:{
    type:Number,
    min:0,
    required:true
},
// saleprice:number,
saleprice:{
    type:Number,
    required:true,
    min:0
},
// Category:string,
category:{
    type:String,
    enum:['Electronics', 'Oral Health', 'Edibles', 'Drinks', 'Household', 'Utility', 'Accessories', 'Jewellery', 'Organic', 'Other'],
    default:'Other'


},
// Stock:number,
stock:{
    type:Number,
    required:true,
    min:0
},
// image:[String] -> cdn links front end 
image:[
    {
    type:String,
    }

]

// createdAt:date

}, {
    timestamps:true
})


const Product = mongoose.model("Product", productSchema);

module.exports= Product