const express = require("express");

const app = express();

//here b is optional ex: ac 
// app.get("/ab?c" , (req,res) => {
//     res.send({firstname:"Swati"});
// });

//here b can be any no of times between a&c ex: abbbbc
// app.get("/ab+c" , (req,res) => {
//     res.send({firstname:"Swati"});
// });

//here at * place can have anything ex: abswatic works
// app.get("/ab*c" , (req,res) => {
//     res.send({firstname:"Swati"});
// });

//start with anythng but should with fly 
// app.get(/.*fly$/ , (req,res) => {
//     res.send({firstname:"Swati"});
// });

//get query param - http://localhost:7771/user?userId=123&name=swati
app.get("/user" , (req,res) => {
    console.log(req.query);
    res.send({firstname:"Swati"});
});

//get dynamc routes - http://localhost:7771/user/123/swati
app.get("/user/:userId/:name" , (req,res) => {
    console.log(req.params);
    res.send({firstname:"Swati"});
});

app.listen(7771);