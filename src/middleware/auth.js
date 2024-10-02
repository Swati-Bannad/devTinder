const jwt = require("jsonwebtoken");

// const adminAuth = (req, res, next) => {
//     const token ="abc";
//     const hastoken = token === "abc";
//     if(!hastoken) {
//         res.status(401).send("not authorized");
//     } else {
//         next();
//     }
// }

// const userAuth = (req, res, next) => {
//     const token ="abc";
//     const hastoken = token === "abc";
//     if(!hastoken) {
//         res.status(401).send("not authorized");
//     } else {
//         next();
//     }
// }

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
     if(!token) {
        throw new Error("Token is not Valid!!!")
     }
     const decodedmsg = await jwt.verify(token, 'jwttokentest');
     next();
    }

    catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}

module.exports = {userAuth };