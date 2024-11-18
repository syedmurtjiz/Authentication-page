const express = require('express');
const multer = require('multer');
const path = require('path');
const { signup, login } = require('../Controllers/authController');
const { signupValidation, loginValidation } = require('../Middlewares/authValidation');
const AuthRouter = express.Router();

// Configure multer storage to store images in the 'uploads' directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

const upload = multer({ storage });

// Signup route (with image upload)
AuthRouter.post('/signup', upload.single('profileImage'), signupValidation, signup);

// Login route
AuthRouter.post('/login', loginValidation, login);

module.exports = AuthRouter;
