

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');

// register controller
const registerUser = async(req, res) => {
    try {
        // extract user info from request body - from frontend
        const {
            username, 
            email,
            password, 
            role
        } = req.body;

        // check if user is already registered
        const checkExistingUser = await User.findOne({ $or : [{username}, {email}] });
        if(checkExistingUser) {
            return res.status(400).json({
                success : false,
                message : 'Input username or email already exists. Please choose a different email or username'
            });
        }

    // hash user input
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user and save in database
    const newlyCreatedUser = new User({
        username, 
        email,
        password : hashedPassword,
        role : role 
    });

    await newlyCreatedUser.save();
    if(newlyCreatedUser) {
        res.status(201).json({
            success : true,
            message : 'User registered successfully'
        });
    } else {
        res.status(400).json({
            success : false,
            message : 'Unable register user. Please try again'
        });
    }

    } catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong. Please try again.'
        });
        
    }
}

// login controller
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        // find if current user is in the database
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success : false,
                message : 'User does not exist'
            });
        }

        // verify password
        const isPasswordMatch =  await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success : false,
                message : 'Invalid credentials'
            });
        }

        // create user token
        const accessToken =  jwt.sign({
            userId : user._id,
            username : user.username,
            role : user.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '15m'
        });

        res.status(200).json({
            success : true,
            message : 'Logged in successfully',
            accessToken, 
            user
        });


    } catch(err){
        console.error(err);
        res.status(500).json({
            success : false,
            message : 'Something went wrong. Please try again.'
        });
        
    }
}

module.exports = {
    registerUser,
    loginUser
};