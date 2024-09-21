const express = require("express");

const app = express();

//this will match all http API calls to /user
// app.use("/user", (req,res) => {
//     res.send("test");
// });

//this will handle get API call to  /user
app.get("/user", (req,res) => {
    res.send({firstname:"swati", lastname:"bannad"});
});

//this will handle post API call to  /user
app.post("/user", (req,res) => {
    res.send("test for post API call");
});

//this will handle delete API call to  /user
app.delete("/user", (req,res) => {
    res.send("deleted matching user detail");
});

app.listen(7771);