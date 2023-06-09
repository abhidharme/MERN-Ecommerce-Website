// const { body, validationResult, query } = require("express-validator");
const userModel = require("../models/user.model");
const { hashPassword, comparePassword } = require("../helpers/auth.heplers")
const colors = require("colors");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const newToken = (id) => {
    return jwt.sign({ _id: id }, process.env.JSON_SECRET_KEY, {
        expiresIn: "7d"
    });
}

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, question, role } = req.body;

        //check user exist or not
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already Register plaese login',
            });
        }

        // register User
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ name, email, phone, address, question, password: hashedPassword, role }).save();
        console.log(`${user}`.bgWhite);
        return res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user
        });
    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        });
    }
}


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            });
        }

        // check password
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(404).send({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = await newToken(user._id);

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });

    }
    catch (error) {
        console.log(error.message.bgRed.bold);
        return res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        });
    }
}


const forgotPasswordController = async (req, res) => {
    try {
        const { email, question, newPassword } = req.body;
        const user = await userModel.findOne({ email, question });

        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'Wrong Email or Password',
            });
        }
        const hash = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hash });
        return res.status(200).send({
            success: true,
            message: "Password reset successfully"
        });
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        });
    }
}

const testController = (req, res) => {
    return res.send("form test");
}

module.exports = { registerController, loginController, testController, forgotPasswordController }