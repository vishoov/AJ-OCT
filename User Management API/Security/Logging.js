// Logging is the process of recording about the details of each request we recieve on the server, including method, URL, time, status code, response time

// and then we can store this data somewhere to improve our server,
// to enhance its security
// to diagnose the crashes whenever they happen
// and to analyse the importance of different routes 

const loggerMiddleware = (req, res, next) =>{
    try{
        //extracting the details from the request
        const time = Date.now();
        const {
            method,
            url,
            ip
        } = req;

        console.log(`[${time}]: ${method} ${url} from ${ip}`);
        next();
    }
    catch(err){
        res.json({
            message:"There is some error"
        })
    }
}

module.exports = {
    loggerMiddleware
}