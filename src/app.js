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
app.patch("/user/:userId" , async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    
    try {
        const allowed_updates = [
            "firstName",
            "age", 
            "gender"
        ];
        const isupdateallowed = Object.keys(data).every((k) => 
            allowed_updates.includes(k)
        );
        console.log(isupdateallowed);
        if (!isupdateallowed) {
            throw new Error("not allowed to update the field");
        }
        const updateduser = await User.findByIdAndUpdate({_id: userId}, data);
        res.send("updated");
    }
    catch(err) {
        res.status(400).send("could not update: " + err.message);
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
//     catch(err) {
//         res.status(400).send("problem in getting matching user" + err.message);
//     }
// });

app.post("/signup", async (req, res) => {
    // console.log(req.body);
    //creating a new instance in User model()
    const doc = new User(req.body);

    try {
        await doc.save();
        res.send("first user signed up");
    }
    catch(err) {
        res.status(400).send("Error savng the user" + err.message);
    }
})

connectDb().then(() => {
    console.log("connected to DB");
    app.listen(7771, () => {
        console.log("server lstening to 7771");
    });
}).catch(() => {
    console.log("can not connect to DB")
});
