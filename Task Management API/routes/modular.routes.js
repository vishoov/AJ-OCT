
//router level middleware
const express = require('express');
const router = express.Router();


//express treats all routes that are defined using router object as a single entity

router.get("/modular_route", (req, res)=>{
    res.send("This is a modular route, and this is in another file, which is in another folder")
})

router.get("/another_route", (req, res)=>{
    res.send("Another route in another file")
})

module.exports = router;