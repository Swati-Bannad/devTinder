const validator = require("validator");

const validateSignup = (req) => {
    const {firstName, email, password} = req.body;

    if(!firstName) {
        throw new Error("Please enter valid Name");
    }else if(!validator.isEmail(email)){
        throw new Error("Please enter valid Email");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter valid Password");
    }
}

module.exports = { validateSignup }