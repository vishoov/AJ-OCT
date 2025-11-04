const mongoose = require('mongoose')


const cartSchema = mongoose.Schema({

// userID:string,
userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
},
// Products:[{
products:[
    {
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Products"
        },
        price:{
            type:Number,
            min:0
        },
        quantity:{
            type:Number,
            min:0
        }
    }
],
// productId: string,
// Price:number,
// quantity:number	
// }],
// totalAmount:number
totalAmount:{
    type:Number
}

}, {
    timestamps:true
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart;