const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const ApiError = require('../utils/apiError');
const User = require('../models/userModel');

const saltRounds = 10;

exports.signup = async (req, res, next) =>{
    try{
        const { username, email, password, address, profileImage, gender } = req.body;
        // Check if email exist more than once or not !? (not unique)
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json('Email is already used');
        }
        // Store Password as hashedPassword
        const hashedPassword = await bcrypt.hash(password, saltRounds);
     
        const user = new User({
            username,
            email,
            password: hashedPassword,
            address,
            profileImage,
            gender
        });
        await user.save();
        res.status(200).json({message: "User Created Successfully", data: user});
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

exports.updateUser = async (req, res, next) => {
  try{

    const { id } = req.params;
    const { username, email, password, address, profileImage} = req.body;
    const user = await User.findByIdAndUpdate(
      // { _id: id },
      id,
    //   { username, slug: slugify(username) },
      {username, email, password, address, profileImage},
      // { new: true }
    );
    if (!user) {
      return (new ApiError(`No user for this id ${id}`, 404));
    }
    res.status(200).json( "updated");
  } catch(err){
    next(err);
  }
};
