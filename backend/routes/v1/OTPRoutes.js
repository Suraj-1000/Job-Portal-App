const express = require('express');
const router = express.Router();
const otpController = require('@/controllers/otpController');

// Signup OTP
router.post('/send-signup-otp', otpController.sendSignupOTP);
router.post('/verify-signup-otp', otpController.verifySignupOTP);

// Login OTP
router.post('/send-login-otp', otpController.sendLoginOTP);
router.post('/verify-login-otp', otpController.verifyLoginOTP);

// Forgot Password OTP
router.post('/send-forgot-password-otp', otpController.sendForgotPasswordOTP);
router.post('/verify-forgot-password-otp', otpController.verifyForgotPasswordOTP);
router.post('/reset-password', otpController.resetPasswordWithOTP);

module.exports = router;
