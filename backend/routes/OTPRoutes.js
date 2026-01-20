const express = require('express');
const {
  sendSignupOTP,
  verifySignupOTP,
  sendLoginOTP,
  verifyLoginOTP,
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  resetPasswordWithOTP
} = require('../controllers/otpController.js');

const router = express.Router();

// Signup OTP
router.post('/send-signup-otp', sendSignupOTP);
router.post('/verify-signup-otp', verifySignupOTP);

// Login OTP
router.post('/send-login-otp', sendLoginOTP);
router.post('/verify-login-otp', verifyLoginOTP);

// Forgot Password OTP
router.post('/send-forgot-password-otp', sendForgotPasswordOTP);
router.post('/verify-forgot-password-otp', verifyForgotPasswordOTP);
router.post('/reset-password', resetPasswordWithOTP);

module.exports = router;
