const express = require("express");
const { default: mongoose } = require("mongoose");

const userConnectionSchema = mongoose.Schema({
    formUserID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Userpassword",
        required: true
    },
    toUserID : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Userpassword",
        required: true
    },
    status : {
        type : String,
        required: true,
        enum: {
            values: ["interested" , "ignored"  , "accepted" , "rejected"],
            message: '{value} is not valid type'
        }
    }
},
{
    timestamps: true
}
);

userConnectionSchema.index({formUserID:1, toUserID:1});
userConnectionSchema.pre("save", function(next) {
    const connectionRequest = this;
    if(this.formUserID.equals(this.toUserID)){
        throw new Error("can not send request to youself");
    }
    next();
})
    

const UserConnectionModel  = mongoose.model("UserConnectionModel" , userConnectionSchema)

module.exports = {UserConnectionModel}