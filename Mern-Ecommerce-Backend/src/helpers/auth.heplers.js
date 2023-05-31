const bcrypt = require("bcrypt");
const colors = require("colors");


const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (err) {
        console.log(err.messge.bgRed.bold);
    }
}

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };