// Signup - POST - sending that to the db	
// Login - POST - email pass -> save it to the db
// Logout
// Update Password
// Profile Page through id 
const router = require("express").Router();

const { signup } = require("../controller/user.controller")




router.post("/signup", signup)


module.exports = router;