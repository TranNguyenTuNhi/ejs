
const User = require('../models/userModels');
const argon2d = require('argon2'); //thu vien bam mat khau an toan
const jwt = require('jsonwebtoken'); //thu vien tao token
require("dotenv").config();
//dang ky
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    //simple validation
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' });
    try {
        //check for esisting user
        const user = await User.findOne({ username });
        
        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'Username already taken' });
    
        //all good
        const hashedPassword = await argon2d.hash(password);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        //return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            proces.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: 'User created successfully',
            accessToken,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        
    }
};

//dang nhap
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    //simple validation
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' });
    try {
        //check for existing user
        const user = await User.findOne({ username });
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or password' });

        //username found
        const passwordValid = await argon2d.verify(user.password, password);
        if (!passwordValid)
            return res
                .status(400)
                .json({ success: false, message: 'Incorrect username or password' });

        //all good
        //return token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: 'User logged in successfully',
            accessToken,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
module.exports = {
    registerUser,
    loginUser,
};

