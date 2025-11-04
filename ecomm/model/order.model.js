const mongoose = require('mongoose')


const orderSchema = mongoose.Schema({
//     Id:string,
// userID:string,
userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
},
// Items:[{
// 	productID:string,
// 	Quantity:number,
// 	Price:number
// }]
items:[
    {
        productID:{
            type:mongoose.Schema.Types.ObjectId,
        },
        quantity:{
            type:Number,
            min:0
        },
        price:{
            type:Number,
            min:0
        }
    }
],
totalAmount:{
    type:Number,
    min:0
},
// 	totalAmount:Number,
// 	shippingAddress:String,
shippingAddress:{
    type:String
},
// 	Status:string,
status:{
    type:String,
    enum:['Pending', 'Shipped', 'Out for delivery','Delivered', "Cancelled"]
}

})

const Order = mongoose.model("Order", orderSchema);


module.exports = Order