const authService = require('@/services/auth.service');
const asyncHandler = require('@/middlewares/asyncHandler');

// @desc    Register a new user
// @route   POST /signup
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
});

// @desc    Auth user & get token
// @route   POST /login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
});

module.exports = { registerUser, loginUser };
