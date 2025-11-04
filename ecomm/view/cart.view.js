const express = require('express');
const router = express.Router();
const{
    addtocart,
    deletefromcart,
    fetchcart
} = require('../controller/cart.controller')


router.post('/addtocart', addtocart)

router.delete('/deletefromcart', deletefromcart)

router.get('/cart/:id', fetchcart)


module.exports = router;