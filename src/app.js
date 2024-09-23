const express = require("express");
const { connectDb } = require("./config/database");
const { User } = require("./model/user");
const app = express();

app.use(express.json());

//getting user by email
// app.get("/feed" , async (req,res) => {

//     const emailId = req.body.email;
//     const users = await User.findOne({email:emailId});
//     try {
//         res.send(users);
//     }
//     catch {
//         res.status(400).send("problem in signing in!!!")
//     }
// });
//get all the users on user collection

app.get("/feed" , async (req,res) => {

    const users = await User.find();
    try {
        res.send(users);
    }
    catch {
        res.status(400).send("problem in signing in!!!")
    }
});

//creating delete API
app.delete("/user", async (req,res) => {
    const userId = req.body._id;
    const deleteuser = await User.findByIdAndDelete(userId);

    try {
        res.send(deleteuser);
    }
    catch {
        res.status(400).send("problem in deleting!!!")
    }
});

//creating update API with  ID
app.patch("/user" , async (req,res) => {
    const userId = req.body._id;
    const emailId = req.body.email;
    const updateduser = await User.findByIdAndUpdate(userId, {email: emailId});

    try {
        res.send(updateduser);
    }
    catch {
        res.status(400).send("problem in getting matching user")
    }
});

//creating update API with first name
// app.patch("/user" , async (req,res) => {
//     const userId = req.body._id;
//     const emailId = req.body.email;
//     const userName = req.body.firstName;
//     const query = { firstName: userName };
//     const updateduser = await User.findOneAndUpdate(query, {email: emailId});

//     try {
//         res.send(updateduser);
//     }
//     catch {
//         res.status(400).send("problem in getting matching user")
//     }
// });

app.post("/signup", async (req, res) => {
    // console.log(req.body);
    //creating a new instance in User model()
    const doc = new User(req.body);

    try {
        await doc.save();
        res.send("first user signed up")
    }
    catch {
        res.status(400).send("problem in signing in!!!")
    }
})

connectDb().then(() => {
    console.log("connected to DB");
    app.listen(7771, () => {
        console.log("server lstening to 7771");
    });
}).catch(() => {
    console.log("can ot connect to DB")
});
