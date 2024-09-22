const express = require("express");
const { connectDb } = require("./config/database");
const { User } = require("./model/user");
const app = express();

app.use(express.json());
app.post("/signup", async (req, res) => {
    // console.log(req.body);
    //creating a new instance in User model()
    const doc = new User(req.body);

    try {
        await doc.save();
        res.send("first user signed up")
    }
    catch {
        res.send("problem in signing in!!!")
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
