const adminAuth = (req, res, next) => {
    const token ="abc";
    const hastoken = token === "abc";
    if(!hastoken) {
        res.status(401).send("not authorized");
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    const token ="abc";
    const hastoken = token === "abc";
    if(!hastoken) {
        res.status(401).send("not authorized");
    } else {
        next();
    }
}
module.exports = { adminAuth,userAuth };