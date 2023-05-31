require("dotenv").config();
const mogoonse = require("mongoose");
const colors = require("colors")


const connectDatabase = () => {
    try {
        console.log("connect to mongoDB Database".bgGreen.bold)
        return mogoonse.connect(process.env.MONGO_URL);
    }
    catch (err) {
        console.log(err.messge.bgRed.bold);
    }
};

module.exports = connectDatabase;