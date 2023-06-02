const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JSON_SECRET_KEY, (err, user) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve(user);
            }
        })
    })
};

const authenticate = async (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(400).send({ message: "authorization token is not provided" });
    }

    if (!req.headers.authorization.startsWith("Bearer ")) {
        return res.status(400).send({ message: "authorization token is not valid or not provided" });
    }

    const token = req.headers.authorization.split(" ")[1];
    let user;
    try {
        user = await verifyToken(token);
    } catch (error) {
        return res.status(404)
            .send({ message: "authorization token is not provide or is not valid" });
    }

    req.user = user;

    return next();
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role === 0) {
            return res.status(401).send({
                success: false,
                message: 'UnAuthorized Access'
            });
        }
        else {
            return next();
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = { authenticate, isAdmin };