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

const setImageURL = (doc) =>{
    if(doc.profileImage){
        const profileImageUrl = `${process.env.BASE_URL}/users/${doc.profileImage}`;
        doc.profileImage = profileImageUrl;
    }
};

// Get All Users, Get One User, Update 
userSchema.post('init', (doc) =>{
    setImageURL(doc);
});

// Create (in response NOT in database)
userSchema.post('save', (doc) =>{
    setImageURL(doc);
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;