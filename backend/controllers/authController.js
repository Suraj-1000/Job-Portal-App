const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../models');
const User = db.User;
const { isSuperAdminEmail } = require('../config/superadmin.js');


// @desc    Register a new user
// @route   POST /signup
// @access  Public
const registerUser = async (req, res) => {
    try {
        console.log('Signup request received:', { ...req.body, password: '***' });

        const { firstName, lastName, email, password } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            console.log('Email already exists:', email);
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        // Determine role based on email
        let userRole = 'user';
        // Check if isSuperAdminEmail function exists and is valid before calling
        if (typeof isSuperAdminEmail === 'function' && isSuperAdminEmail(email.toLowerCase())) {
            userRole = 'superadmin';
            console.log('SuperAdmin email detected, assigning superadmin role');
        }

        // Create user
        const userData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            password: hashed,
            role: userRole
        };

        console.log('Creating user with data:', { ...userData, password: '***' });
        const user = await User.create(userData);
        console.log('User created successfully:', user.id);

        // Exclude password from response
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userResponse
        });
    } catch (error) {
        console.error('Signup error:', error);

        // Handle Sequelize Unique Constraint Error
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Handle Sequelize Validation Error
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(e => e.message);
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// @desc    Auth user & get token
// @route   POST /login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }


        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last login time
        user.lastLogin = new Date();
        // user.save() in Sequelize updates the instance
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Exclude password from response
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { registerUser, loginUser };
