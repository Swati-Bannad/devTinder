const express = require("express");

const app = express();

// const { adminAuth, userAuth } = require("./middleware/auth");

// app.use("/admin", adminAuth);
// // app.use("/user", userAuth);

// app.use("/admin/deleteData", (req,res) => {
//     res.send("deleted data");
// });

// app.use("/admin/getData", (req,res) => {
//     res.send("fetched data");
// });

app.get("/user", (req,res) => {
    throw new Error("error!!!!");
    res.send("data sent");
});

app.use("/", (err,req,res,next) => {
    if(err) {
        res.status(500).send("something went wrong");
    } 
});

app.listen(7771);