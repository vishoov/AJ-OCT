// server deployment is always paid
//pay according to the resources 


//whenever a hacker tries to harm our server 
//1. steal the info
//2. tries to harm the server by overwhelming it (bottlenecks)

//example -> 100MB and i5 -> 10,000 requests per seconds (RPS) 

//10,00,000 in a single second -> IT WILL CRASH!!!!
//DDoS -> Distributed Denial of Service 

//hackers use 10000s of small bots that keep sending requests to our server repeatedly 

//Rate limiting to limit the number of requests we can reciever from a certain IP address in a given time frame 

//------code--------
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
    //Time window in miliseconds
    windowMs: 1000*60*60,
    max:5,
    message:"Too many requests from this IP address, please try again after 60 minutes"

})

module.exports = rateLimiter;
