const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const {UserConnectionModel} = require("../model/userconnection");
const {userpassword, Userpassword} = require("../model/userpassword");

requestRouter.post("/request/:status/:toUserID", userAuth, async (req,res) => {
   
    try {
        const {_id} = req.userpassword;
        const formUserID = _id;
        const toUserID = req.params.toUserID;
        const status = req.params.status;
        
        // console.log(_id);
        // console.log("to:" + toUserID);
        // console.log(status);

        const allowedStatus = ["interested" , "ignored"];
        if(!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "invalid status type " + status 
            })
        }

        const toUser =  await Userpassword.findById(toUserID);
        if(!toUser) {
            throw new Error("Not a valid user");
        }

        const existingconnectionRequest = await UserConnectionModel.findOne({
            $or: [
                {formUserID, toUserID},
                {formUserID:toUserID, toUserID:formUserID}
            ]
        })
        if(existingconnectionRequest) {
            return res.send("Connection already exists");
        }

        // if(formUserID.equals(toUserID)){
        //     throw new Error("can not send request to yourself!");
        // }

        const connectionRequest = new UserConnectionModel({
            formUserID,
            toUserID,
            status
        });
        const data = await connectionRequest.save();

        // res.send("fetch logged user");
        res.json({
            message: req.userpassword.firstName + " " + status + " " + toUser.firstName,
            data
        });

    }catch(err){
        res.status(400).send("Error:" + err.message);
    }
})

requestRouter.post("/request/review/:status/:requestID", userAuth, async(req,res) => {
    try {
        const loggedInUser = req.userpassword;
        const requestID = req.params.requestID;
        const status = req.params.status;
        console.log(status);
        console.log(requestID);
        console.log(loggedInUser);

        //status validation
        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            throw new Error("Not a valid status");
        }

        const connectionRequest = await UserConnectionModel.findOne({
            _id:requestID,
            toUserID: loggedInUser._id,
            status:"interested"
        })

        if(!connectionRequest) {
            return res.status(400).send("Did not find valid connection");
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json(
            {
                message: "connection request" + " " + status,
                data
            })


    }catch(err) {
        res.status(400).send("Error:" + err.message);
    }
    
})


module.exports = requestRouter;

