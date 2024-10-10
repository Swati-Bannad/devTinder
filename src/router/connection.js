const express = require("express");
const { userAuth } = require("../middleware/auth");
const { UserConnectionModel } = require("../model/userconnection");
const { Userpassword } = require("../model/userpassword");

const connectionRouter = express.Router();

// const USER_SAFE_DATA = "firstName, age, gender";

connectionRouter.get("/user/requests/received", userAuth, async(req,res) => {
    try {
        const loggedInUser = req.userpassword;
        // console.log(loggedInUser);
        const userList = await UserConnectionModel.find({
            toUserID:loggedInUser._id,
            status:"interested"
        }).populate("formUserID", ["firstName"]).populate("toUserID", ["firstName"]);
        
        // console.log(userList);

        res.json({
            message:"List of Pending Requests",
            data:userList
        });
    }catch(err) {
        res.status(400).send("Error:" + err.message);
    }
});

connectionRouter.get("/user/connections", userAuth, async(req,res) => {
    try {
        const loggedInUser = req.userpassword;
        console.log(loggedInUser);
        const userList = await UserConnectionModel.find({
            $or: [
                {toUserID:loggedInUser._id,status:"accepted"},
                {formUserID:loggedInUser._id,status:"accepted"}
            ]
            
        }).populate("formUserID", "firstName").populate("toUserID", "firstName");

        const data = userList.map((row) => {
            if(row.formUserID._id.toString() === loggedInUser._id.toString()) {
                return row.toUserID.firstName;
            }
            else{
                return row.formUserID.firstName;
            }
        })
        
        // console.log(data);


        res.json({
            message:"My connections",
            data: data
        });
    }catch(err) {
        res.status(400).send("Error:" + err.message);
    }
})

connectionRouter.get("/user/feed", userAuth, async(req,res) => {
    try { 
        const loggedInUser = req.userpassword;
        const connectionRequests = await UserConnectionModel.find({
            $or: [
                {formUserID: loggedInUser._id},
                {toUserID: loggedInUser._id}

            ]
        }).select("formUserID toUserID");
        

        const hideusersfromfeed = new Set();
        connectionRequests.forEach((row) => {
            hideusersfromfeed.add(row.formUserID.toString());
            hideusersfromfeed.add(row.toUserID.toString());
        });
        console.log(hideusersfromfeed);

        const users = await Userpassword.find({
            $and:[
                {_id: {$nin: Array.from(hideusersfromfeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]

        });
        console.log("feed" + users);
        res.send(users);
        

    }catch(err){
        res.status(400).send("Error:" + err.message);
    }
    

})

module.exports = connectionRouter;