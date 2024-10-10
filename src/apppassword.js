const express = require("express");
const { connectDb } = require("./config/database");
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const connectionRouter = require("./router/connection");


const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", connectionRouter);

connectDb().then( () => {
    console.log("Connected to DB");
    app.listen(7777, () => {
        console.log("Server connection established");
    });
}).catch(() =>{
    console.log("Not connected to DB");
});