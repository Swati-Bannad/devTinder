const express = require("express");

const app = express();

app.use("/user", (req, res, next) => {
    // res.send("multitest");
    next();
},
(req, res) => {
    res.send("multitest2");
},
);

app.listen(7771);