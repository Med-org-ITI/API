const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const customError = require('../customError');
const User = require('../models/userModel');
const { hashPassword, comparePassword, SignUserToken } = require('../userHelpers');
const authorizeUser = require('../middlewares/userMiddleware');
const userValidation = require('../userValidation');

exports.signup = async (req, res, next) =>{
    try{
        const { username, email, password, address, image, gender } = req.body;
        // Check if email exist more than once or not !? (not unique)
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.json('Email is already used');
        }
        // Store Password as hashedPass
        const hashedPassword = await hashPassword(password);
     
        const user = new User({
            username,
            email,
            password: hashedPassword,
            address,
            image,
            gender
        });
        user.save();
        res.status(200).send("User Created Successfully");
    } catch(error){
        next(error);
    }
};

exports.login = async (req, res, next) =>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) throw customError(401, "Invalid Username or Password");  //if name not found in database
        await comparePassword(password, user.password); //user.password (hashed in database)
        const token = await SignUserToken(user.id);
        res.status(200).send({accessToken: token});
    } catch(error){
        next(error);
    }
};
