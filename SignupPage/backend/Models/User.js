const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructuring for better readability

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String, // This will store the path to the profile image
    },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
