const express = require("express");
const { connectDb } = require("./config/database");
const { Userpassword } = require("./model/userpassword");
const { validateSignup } = require("./utils/validate");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

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
            throw new Error("invalid credentials");
        }
        // console.log(password);
        // console.log(matchinguser.password);
        
        const ispasswordvalid = await bcrypt.compare(password, matchinguser.password);
        
        if(ispasswordvalid) {
           res.send("Login success");
        }else{
            throw new Error("invalid credentials");
        }

    }
    catch(err) {
        res.status(400).send("ERROR: " + err.message);
    }
    
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