const jwt = require('jsonwebtoken');



//login route or sign up route because here is where the user will be sending his information or data
const createToken = (user) =>{
    //we need user specific information
    //jwt is OPINIONATED = it contains user specific information 
    try{
        const token = jwt.sign(
            //payload = user info 
            {
                id:user._id, //identifies the user
                role:user.role //this is for role based access control 
            },
            //secret key = signature
            process.env.SECRET_KEY,
            //options = header
            {
                //d days, h for hours, m for minutes, s for seconds, 1y = 1 year 
                expiresIn:"100d", //when will this token be deleted 
                issuer:"Vishoo's Project", //the project or the system which created the token 
                algorithm:"HS256"
            }
        )
        return token;
    }
    catch(err){
        console.error(err.message)
        throw new Error(err.message)
    }
}


//a middleware for verifying the token for protected routes
const verifyToken  = (req, res, next)=>{
        //the token will be stored in the authorization header of req.header
        //Authorization : Bearer token
    try{
        //1, extract the token from the req header
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        // ['Bearer', 'Token']

        if(!token){
            return res.status(400).json({
                message:"Access Denied"
            })
        }

        //2. verify the token
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        )
        console.log(decoded)

        req.user = decoded;
        next();
    }
    catch(err){
        console.error("Error verifying the token:", err.message)
        throw new Error("Token verification failed")
    }

}


const roleMiddleware = (allowedRoles) => (req, res, next)=>{
    if(!allowedRoles.includes(req.user.role)){
        return res.status(400).json({
            message:"Access denied, Limited Persmissions allowed "
        })
    }

    next()
}

module.exports = {
    createToken,
    verifyToken,
    roleMiddleware
}