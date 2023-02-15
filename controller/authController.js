const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises')
const ApiError = require('../utils/apiError');
const User = require('../models/userModel');
const cloud = require('../utils/uploadImgCloudinary');

const saltRounds = 10;

exports.signup = async (req, res, next) =>{
    try{
        const { username, email, password, address, profileImage, gender } = req.body;
        // console.log(req.file.path);
        // Check if email exist more than once or not !? (not unique)
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json('Email is already used');
        }
        // Store Password as hashedPassword
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // upload image (Cloudinary)
        const result = await cloud.uploadImage(req.file.path, "users");
        const user = new User({
            username,
            email,
            password: hashedPassword,
            address,
            profileImage: result.url,
            gender
        });
        await user.save();
        await fs.unlink(req.file.path); // remove images from folder uploads
        res.status(201).json({message: "User Created Successfully", data: user});
    } catch(err){
        res.status(500).json(err.message);
    }
};

exports.login = async (req, res, next) =>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) throw new ApiError("Invalid Username or Password", 401);  //if name not found in database
       
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if(!isCorrectPassword) throw new ApiError("Invalid Username or Password", 401);
        
        const { _id: id} = user;
        const token = jwt.sign({ id }, process.env.SECRET_KEY, {expiresIn: '90d'});
        res.status(200).json({message: "Logged in Successfully", accessToken: token});
    } catch(err){
        res.status(500).json(err.message);
    }
};
