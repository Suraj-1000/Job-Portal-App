const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;
const Otp = db.Otp; // Make sure db.Otp is correct, usually capitalized model name
const { sendOTPEmail } = require('../utils/emailService.js');


const { isSuperAdminEmail } = require('../config/superadmin.js');
const { Op } = require('sequelize');

// Helper: Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Send OTP for signup
// @route   POST /api/otp/send-signup-otp
// @access  Public
const sendSignupOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete any existing OTPs for this email and type
        await Otp.destroy({ where: { email: email.toLowerCase(), type: 'signup' } });

        // Save OTP
        await Otp.create({
            email: email.toLowerCase(),
            otp,
            type: 'signup',
            expiresAt
        });

        // Send OTP email
        await sendOTPEmail(email, otp, 'signup');

        res.json({
            success: true,
            message: 'OTP sent to your email'
        });
    } catch (error) {
        console.error('Error sending signup OTP:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Verify OTP and complete signup
// @route   POST /api/otp/verify-signup-otp
// @access  Public
const verifySignupOTP = async (req, res) => {
    try {
        const { firstName, lastName, email, password, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !otp) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find OTP
        const otpRecord = await Otp.findOne({
            where: {
                email: email.toLowerCase(),
                otp,
                type: 'signup',
                verified: false,
                expiresAt: { [Op.gt]: new Date() }
            }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Check if user already exists (double check)
        const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Mark OTP as verified
        otpRecord.verified = true;
        await otpRecord.save();

        // Determine role
        let role = 'user';
        if (typeof isSuperAdminEmail === 'function' && isSuperAdminEmail(email.toLowerCase())) {
            role = 'superadmin';
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            password: hashed,
            role
        });

        // Delete the used OTP
        await otpRecord.destroy();

        // Update last login
        user.lastLogin = new Date();
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

        res.json({
            success: true,
            message: 'Account created successfully',
            token,
            user: userResponse
        });
    } catch (error) {
        console.error('Error verifying signup OTP:', error);

        // Handle duplicate key error (email)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email already exists' });
        }

        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Send OTP for login
// @route   POST /api/otp/send-login-otp
// @access  Public
const sendLoginOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if user exists
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete any existing OTPs for this email and type
        await Otp.destroy({ where: { email: email.toLowerCase(), type: 'login' } });

        // Save OTP
        await Otp.create({
            email: email.toLowerCase(),
            otp,
            type: 'login',
            expiresAt
        });

        // Send OTP email
        await sendOTPEmail(email, otp, 'login');

        res.json({
            success: true,
            message: 'OTP sent to your email'
        });
    } catch (error) {
        console.error('Error sending login OTP:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Verify OTP for login
// @route   POST /api/otp/verify-login-otp
// @access  Public
const verifyLoginOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Find OTP
        const otpRecord = await Otp.findOne({
            where: {
                email: email.toLowerCase(),
                otp,
                type: 'login',
                verified: false,
                expiresAt: { [Op.gt]: new Date() }
            }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark OTP as verified
        otpRecord.verified = true;
        await otpRecord.save();

        // Get user
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update last login
        user.lastLogin = new Date();
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

        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: userResponse
        });
    } catch (error) {
        console.error('Error verifying login OTP:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Send OTP for forgot password
// @route   POST /api/otp/send-forgot-password-otp
// @access  Public
const sendForgotPasswordOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if user exists
        const user = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        // Delete any existing OTPs for this email and type
        await Otp.destroy({ where: { email: email.toLowerCase(), type: 'forgot-password' } });

        // Save OTP
        await Otp.create({
            email: email.toLowerCase(),
            otp,
            type: 'forgot-password',
            expiresAt
        });

        // Send OTP email
        await sendOTPEmail(email, otp, 'forgot-password');

        res.json({
            success: true,
            message: 'OTP sent to your email'
        });
    } catch (error) {
        console.error('Error sending forgot password OTP:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Verify OTP for forgot password
// @route   POST /api/otp/verify-forgot-password-otp
// @access  Public
const verifyForgotPasswordOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: 'Email and OTP are required' });
        }

        // Find OTP
        const otpRecord = await Otp.findOne({
            where: {
                email: email.toLowerCase(),
                otp,
                type: 'forgot-password',
                verified: false,
                expiresAt: { [Op.gt]: new Date() }
            }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Mark OTP as verified
        otpRecord.verified = true;
        await otpRecord.save();

        res.json({
            success: true,
            message: 'OTP verified successfully'
        });
    } catch (error) {
        console.error('Error verifying forgot password OTP:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Reset password with OTP
// @route   POST /api/otp/reset-password
// @access  Public
const resetPasswordWithOTP = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'Email, OTP, and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Find verified OTP
        const otpRecord = await Otp.findOne({
            where: {
                email: email.toLowerCase(),
                otp,
                type: 'forgot-password',
                verified: true,
                expiresAt: { [Op.gt]: new Date() }
            }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP. Please verify OTP again.' });
        }

        // Get user
        const userToUpdate = await User.findOne({ where: { email: email.toLowerCase() } });
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        userToUpdate.password = hashedNewPassword;
        await userToUpdate.save();

        // Delete the used OTP
        await otpRecord.destroy();

        res.json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    sendSignupOTP,
    verifySignupOTP,
    sendLoginOTP,
    verifyLoginOTP,
    sendForgotPasswordOTP,
    verifyForgotPasswordOTP,
    resetPasswordWithOTP
};
