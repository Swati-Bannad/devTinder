const express = require("express");

const app = express();

app.use("/test", (req,res) => {
    res.send("testing connection at 7771")
});

app.use("/hello", (req,res) => {
    res.send("hello hello hello")
});

app.use((req,res) => {
    res.send("hello world")
});
app.listen(7771), () => {
    console.log("listening to 7771");
};