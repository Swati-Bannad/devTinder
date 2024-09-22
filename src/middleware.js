const express = require("express");

const app = express();

const { adminAuth } = require("./middleware/auth");

app.use("/admin", adminAuth);
app.use("/admin/deleteData", (req,res) => {
    res.send("deleted data");
});

app.use("/admin/getData", (req,res) => {
    res.send("fetched data");
});
app.listen(7771);