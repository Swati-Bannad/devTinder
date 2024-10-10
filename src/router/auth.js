const express = require("express");
const { validateSignup } = require("../utils/validate");
const { Userpassword } = require("../model/userpassword");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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
        // console.log("Login:" + token + ", " + matchinguser._id);
        
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

authRouter.post("/logout" , async (req,res) => {
    res.cookie("token", null, {
        expires: new Date ( Date.now() )
    });
    res.send("Logged out");
})

module.exports = authRouter;