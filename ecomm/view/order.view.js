const express = require('express')
const router = express.Router();
const { Place, Cancel, Track } = require("../controller/order.controller");
const Order = require('../model/order.model');

// Place Order
router.post("/place/:id", Place)
// Cancel Order
router.put("/cancel/:id", Cancel)
// Track
router.get("/track/:id", Track)

router.get("/orders", async (req, res)=>{
    const orders = await Order.find();

    res.json({
        orders
    })
})


module.exports = router;