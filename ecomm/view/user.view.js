// Signup - POST - sending that to the db	
// Login - POST - email pass -> save it to the db
// Logout
// Update Password
// Profile Page through id 
const router = require("express").Router();

const { signup, login, allusers, profile, updatepass } = require("../controller/user.controller")




router.post("/signup", signup)
router.post("/login", login)
router.get("/all", allusers)
router.get("/profile/:id", profile)
router.patch("/updatePassword/:id", updatepass)

module.exports = router;