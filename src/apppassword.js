const express = require("express");
const { connectDb } = require("./config/database");
const { Userpassword } = require("./model/userpassword");
const { validateSignup } = require("./utils/validate");
const { userAuth } = require("./middleware/auth");

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    try {
        //Validate data
        validateSignup(req);
        
        //Encrypt password
        const {firstName, email, age, gender, password} = req.body;

        const passwordhash = await bcrypt.hash(password, 10);
        // console.log(passwordhash);

        const doc = new Userpassword({
            firstName,
            email, 
            age, 
            gender, 
            password: passwordhash
        });
        
        await doc.save();
        res.send("added user");
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const matchinguser = await Userpassword.findOne({email: email});
        if(!matchinguser) {
            throw new Error("invalid email");
        }
        // console.log(password);
        // console.log(matchinguser.password);
        
        const ispasswordvalid = await bcrypt.compare(password, matchinguser.password);
        
        if(ispasswordvalid) {
        // res.cookie("token", "abcdefghijk");
        const token = jwt.sign({_id: matchinguser._id}, "jwttokentest");
        console.log("Login:" + token + ", " + matchinguser._id);
        
        //we can create a ccommon method in schema and call it for creating token and even for password hash.
        // const token = matchinguser.getJWT();
        // console.log("Login:" + token + ", " + matchinguser._id);

        res.cookie("token", token);
        res.send("Login success");
        }else{
            throw new Error("invalid password");
        }
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
});

app.get("/profile", async (req, res) => {
    const {token} = req.cookies;
    const decodedmsg = await jwt.verify(token, 'jwttokentest');
    const {_id} = decodedmsg; 
    const loggedperson = await Userpassword.findById(_id);

    res.send(loggedperson);
});

app.get("/sendconnectrequest", userAuth, async (req, res) => {

    res.send("request sent");
});

app.delete("/userpassword", async (req, res) => {
    const query = { firstName: req.body.firstName};
    const deletedUser = await Userpassword.findOneAndDelete(query);

    try {
        res.send(deletedUser);
    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
});

connectDb().then( () => {
    console.log("Connected to DB");
    app.listen(7777, () => {
        console.log("Server connection established");
    });
}).catch(() =>{
    console.log("Not connected to DB");
});