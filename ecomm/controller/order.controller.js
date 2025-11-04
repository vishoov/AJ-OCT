const Cart = require("../model/cart.model");
const Order = require("../model/order.model");
const User = require("../model/user.model");

const Place = async (req, res)=>{
    try{
        const userId = req.params.id;
        console.log(userId)
        const cart = await Cart.findOne({userId});
        console.log(cart)
        if(cart.products.length===0){
            res.send("Cart is empty")
        }
        
        const user = await User.findOne({_id:userId});
        console.log(user)

        const shippingAddress= user.address || "123, demo street";

        const order = new Order({
            userID:userId,
            items:cart.products,
            totalAmount:cart.totalAmount,
            shippingAddress,
            status:"Pending"
        })

        await order.save();

        await Cart.findByIdAndDelete(cart._id);

        res.send({
            message:"Order Placed Successfully",
            order
        })

    }
    catch(err){
        res.send(err.message)
    }
}

const Cancel = async (req, res)=>{

    const id = req.params.id;
    const order = await Order.findOne({_id:id})

    if(!order){
        res.json({
            message:"Order not found"
        })
    }

    order.status="Cancelled"
    await order.save();

    res.json({
        message:"Order cancelled",
        order
    })
}

const Track = async (req, res)=>{
    try{
        const id = req.params.id;

        const order = await Order.findOne({_id:id});

        if(!order){
            res.send("No order found")
        }


        res.status(200).json({
            message:"Here's your order's status",
            order
        })
    }
    catch(err){
        res.send(err.message)
    }
}


module.exports = {
    Place, Cancel, Track
}