const express= require('express');
const app = express();

app.get("/", (req, res)=>{
    res.send("Welcome to dynamic routes")
})

app.get("/home", (req, res)=>{
    res.send("Welcome to dynamic home")
})


//Dynamic Routing 
// /home, /contact, /about.....

//   /product/sony_tv
//      /product/iphone

//Route Parameters
//fixed predefined variable in the route
app.get("/product/:variable", (req, res)=>{

    //these params HAVE to be present in the path in order for the path to work
    const route_param = req.params.variable;


    res.send(
        `this is the product page with variable ${route_param}`
    )
})

// movie broadcasting server
// dynamic route for a movie page
// localhost:3000/movie/:id -> id= route parameter
// get /movie/:id response = you are watching movie with id :id



//Query Parameters
// http://localhost:3000/query?variable=query_parameter
app.get("/query", (req, res)=>{

    const query_param = req.query.variable;

    res.send(
        `This is the query parameter ${query_param}`
    )
})

//youtube 
// query parameters 

// http://localhost:3000/search?q=virat_kohli_batting
//method = get
//path search
// q
//response = Here are the results for ${query} search

//chaining of route parameters
app.get('/review/:productId/:userId', (req, res)=>{
    const productID = req.params.productId;
    const userID= req.params.userId;


    //product, user
    // example usage http://localhost:3000/review/iphone/tim_cook

    res.json({
        product:productID,
        user:userID
    })
})


app.listen(3000, ()=>{
    console.log("The Dynamic Routes File is live on http://localhost:3000/")
})


// What is the difference between route parameters and query parameters?

//route parameters are predefined variables in the path of the routes, where we defined the variable using a colon (:) These are used to identify specific resources in the database or the server

// app.get('users/:id', (req, res)=>{
    // res.send(req.param.id)    
// })

// mandatory 


// Query Params are key value pairs in URL that come after a question mark (?), typically used for filtering, searching, for anything that is optional 