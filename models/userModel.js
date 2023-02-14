const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'name required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password required'],
        minlength: [8, 'password must be at least 8 characters'],

    },
    address: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    }


}, {timestamps: true});

module.exports =  mongoose.model('users', userSchema);;