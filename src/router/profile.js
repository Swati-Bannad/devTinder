const express = require("express");
const {userAuth } = require("../middleware/auth");
const { Userpassword } = require("../model/userpassword");

const jwt = require("jsonwebtoken");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    const {token} = req.cookies;
    const decodedmsg = await jwt.verify(token, 'jwttokentest');
    const {_id} = decodedmsg; 
    const loggedperson = await Userpassword.findById(_id);

    res.send(loggedperson);
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const allowedfields = ["firstName", "gender" , "age"];
        const isallowed = Object.keys(req.body).every((field) => allowedfields.includes(field));
        if(!isallowed){
            throw new Error("edit is now allowed");
        }
        const loggedinuser = req.userpassword;

        Object.keys(req.body).forEach((key) => loggedinuser[key]= req.body[key]);
        loggedinuser.firstName = req.body.firstName;

        console.log(loggedinuser);
        loggedinuser.save();

        res.send("Edited");
    }
    catch (err) {
        res.status(400).send("Error:" + err.mesage);
    }
});

module.exports = profileRouter;