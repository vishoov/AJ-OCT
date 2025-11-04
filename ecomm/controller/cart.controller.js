const Cart = require('../model/cart.model');




// Add to cart
const addtocart = async (req, res) => {
    try {
        const { id } = req.params; // This is userId
        const { productId, quantity, price } = req.body;

        // Find cart by userId, not _id
        let cart = await Cart.findOne({ userId: id });

        if (cart) {
         
          
                cart.products.push({ productId, quantity, price });
            

            // Update totalAmount
            cart.totalAmount += quantity * price;
            await cart.save();

            res.json({
                message: "Product added to cart",
                cart
            });
        } else {
            // Create new cart
            const newCart = await Cart.create({
                userId: id,
                products: [{ productId, quantity, price }],
                totalAmount: quantity * price
            });


            res.json({
                message: "Cart created",
                cart: newCart
            });
        }
    } catch (err) {
        console.error('Add to cart error:', err);
        res.status(500).json({
            message: "Failed to add product to cart"
        });
    }
};

// Delete From Cart
const deletefromcart = async (req, res)=>{
    try{
        const userId = req.params.id
        const { productId } = req.body;


        const cart= await Cart.findOne({userId});

        if(!cart){
            res.status(404).json({
                message:"Cart doesnt exist for this user"
            })
        }

        const productIndex = cart.products.findIndex(
            p=>p.productId.toString()===productId.toString()
        )

        if(productIndex===-1){
            res.status(400).json({
                message:"Product doesnt exist in the cart"
            })
        }

        cart.products.splice(productIndex, 1);
        cart.totalAmount = cart.products.reduce(
            (sum, item)=>sum+item.price*item.quantity, 0 
        )


        await cart.save();

        res.status(200).json({
            message:"Product deleted successfully from the cart"
        })
    }
    catch(err){
        res.send(err.message)
    }
}
// Fetch Cart
const fetchcart= async (req, res)=>{
    try{
        const userId = req.params.id;
        const cart = await Cart.findOne({
            userId
        })

        if(!cart){
            res.status(400).json({
                message:"Cart not found"
            })
        }

        res.status(200).json({
            cart
        })
    }
    catch(err){
        res.send(err.message)
    }
}


module.exports= {
    addtocart,
    deletefromcart,
    fetchcart
}
