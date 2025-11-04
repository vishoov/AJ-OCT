const express = require('express');
const router = express.Router();
const{
    addtocart,
    deletefromcart,
    fetchcart
} = require('../controller/cart.controller')


router.post('/addtocart/:id', addtocart)

router.delete('/deletefromcart/:id', deletefromcart)

router.get('/cart/:id', fetchcart)


module.exports = router;