const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema( {

    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique:true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email not valid");
            } 
        }
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate (value) {
            if(!["male", "female", "other"].includes(value)) {
                throw new Error("Gender value is not valid");
            }
           
        }
    },
    password: {
        type: String,
        validate (value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Please enter strong password");
            }
           
        }
    }
},
{
    timestamps : true,
},
);

const Userpassword = mongoose.model("Userpassword" , userSchema);

module.exports = { Userpassword };