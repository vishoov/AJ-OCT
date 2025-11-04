const Product = require('../model/product.model')


const createProduct = async (req, res)=>{

    const {
        name,
        description,
        costprice,
        saleprice, category,
        stock, image
     }  = req.body;


     const product = await Product.create(req.body);

     if(!product){
        return res.status(400).json({
            mesage:"No product found"
        })
     }

     res.status(201).json({
        message:"Product created successfully",
        product
     })



 
}


const getProducts = async (req, res)=>{
    try{
        const products = await Product.find();

        if(!products){
            return res.status(404).send("Products not")
        }


        return res.status(200).json({
            message:"Products found",
            products
        })

    }
    catch(err){
        res.status(500).send(err.message)
    }
}

const updateProduct = async (req, res)=>{
    try{
        const id = req.params.id;
        const updates = req.body;
        const product = await Product.findByIdAndUpdate(
            id,
            updates,
            {
                new:true
            }
        )

        if(!product){
            return res.status(404).send("Product not found")
            
        }

        return res.status(200).json({
            message:"Product updated successfully",
            product
        })
    }
    catch(err){
        return res.status(500).send(err.message)
    }
}

const deleteProduct = async (req, res)=>{
    try{
    const id = req.params.id;

        const deletedProduct = await Product.findByIdAndDelete(
            id
        )

        if(!deletedProduct){
            return res.json({
                message:"Product not found"
            })
        }

        res.status(200).json({
            message:"Product Deleted",
            deletedProduct
        })

    }
    catch(err){
        res.status(505).send(err.message)
    }
}

const search = async (req, res)=>{
    try{
        const {query } =req.query;

        const searchResults = await Product.find({
            $or:[
                {
                    name:{
                        //bat -> batt, baat, bbat
                        $regex:query
                    }
                },
                {
                    description:{
                        $regex:query
                    }
                }
            ]
        })
        
        if(searchResults.length===0){
            return res.status(400).json({
                message:"No products found"
            })
        }

        res.status(200).json({
            message:"Search results",
            searchResults
        })

    }
    catch(err){
        res.send(err.message)
    }
}



module.exports = {
    createProduct,
    getProducts, updateProduct, deleteProduct, search 
}