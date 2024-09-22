const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose.connect("mongodb+srv://swatibannad:DVzMyCZMk2yO5nRM@firstnode.sib96.mongodb.net/devTinder");
}
module.exports = { connectDb };