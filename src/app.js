const express = require("express");

const app = express();

// app.use((req,res) => {
//     res.send("hello")
// });

app.use("/test", (req,res) => {
    res.send("testing connection at 7771")
})
app.listen(7771), () => {
    console.log("listening to 7771");
};