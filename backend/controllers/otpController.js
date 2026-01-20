const otpService = require('@/services/otp.service');
const asyncHandler = require('@/middlewares/asyncHandler');

// @desc    Send OTP for signup
// @route   POST /api/otp/send-signup-otp
// @access  Public
const sendSignupOTP = asyncHandler(async (req, res) => {
    const result = await otpService.sendSignupOTP(req.body.email);
    res.json(result);
});

// @desc    Verify OTP and complete signup
// @route   POST /api/otp/verify-signup-otp
// @access  Public
const verifySignupOTP = asyncHandler(async (req, res) => {
    const result = await otpService.verifySignupOTP(req.body);
    res.json(result);
});

// @desc    Send OTP for login
// @route   POST /api/otp/send-login-otp
// @access  Public
const sendLoginOTP = asyncHandler(async (req, res) => {
    const result = await otpService.sendLoginOTP(req.body.email);
    res.json(result);
});

// @desc    Verify OTP for login
// @route   POST /api/otp/verify-login-otp
// @access  Public
const verifyLoginOTP = asyncHandler(async (req, res) => {
    const result = await otpService.verifyLoginOTP(req.body);
    res.json(result);
});

// @desc    Send OTP for forgot password
// @route   POST /api/otp/send-forgot-password-otp
// @access  Public
const sendForgotPasswordOTP = asyncHandler(async (req, res) => {
    const result = await otpService.sendForgotPasswordOTP(req.body.email);
    res.json(result);
});

// @desc    Verify OTP for forgot password
// @route   POST /api/otp/verify-forgot-password-otp
// @access  Public
const verifyForgotPasswordOTP = asyncHandler(async (req, res) => {
    const result = await otpService.verifyForgotPasswordOTP(req.body);
    res.json(result);
});

// @desc    Reset password with OTP
// @route   POST /api/otp/reset-password
// @access  Public
const resetPasswordWithOTP = asyncHandler(async (req, res) => {
    const result = await otpService.resetPasswordWithOTP(req.body);
    res.json(result);
});

module.exports = {
    sendSignupOTP,
    verifySignupOTP,
    sendLoginOTP,
    verifyLoginOTP,
    sendForgotPasswordOTP,
    verifyForgotPasswordOTP,
    resetPasswordWithOTP
};
