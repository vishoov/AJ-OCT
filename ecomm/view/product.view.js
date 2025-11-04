const express = require('express');
const router = express.Router();

const { createProduct, getProducts, updateProduct, deleteProduct, search } = require("../controller/product.controller") 

// Create product /createproduct

router.post("/createproduct", createProduct)
// Fetch Products /products
router.get("/products", getProducts)
// Update Product /updateProduct
router.put("/update/:id", updateProduct)
// Delete Product /deleteProduct
router.delete('/delete/:id', deleteProduct)
// Search /searchProduct
router.get("/search", search)







module.exports = router