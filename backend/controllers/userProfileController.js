const userProfileService = require('@/services/userProfile.service');
const asyncHandler = require('@/middlewares/asyncHandler');

const userProfileController = {
    // Get user profile
    getProfile: asyncHandler(async (req, res) => {
        const user = await userProfileService.getProfile(req.user.id);
        res.json(user);
    }),

    // Update user profile
    updateProfile: asyncHandler(async (req, res) => {
        const result = await userProfileService.updateProfile(req.user.id, req.body);
        res.json({
            message: 'Profile updated successfully',
            user: result
        });
    }),

    // Change password
    changePassword: asyncHandler(async (req, res) => {
        const result = await userProfileService.changePassword(req.user.id, req.body);
        res.json(result);
    }),

    // Update email
    updateEmail: asyncHandler(async (req, res) => {
        const result = await userProfileService.updateEmail(req.user.id, req.body);
        res.json(result);
    }),

    // Delete account
    deleteAccount: asyncHandler(async (req, res) => {
        const result = await userProfileService.deleteAccount(req.user.id, req.body.password);
        res.json(result);
    }),

    // Get applied jobs
    getAppliedJobs: asyncHandler(async (req, res) => {
        const applications = await userProfileService.getAppliedJobs(req.user.id, req.query.status);
        res.json(applications);
    }),

    // Apply for a job
    applyForJob: asyncHandler(async (req, res) => {
        const application = await userProfileService.applyForJob(req.user.id, req.body);
        res.status(201).json({
            message: 'Application submitted successfully',
            application
        });
    }),

    // Get favorite jobs
    getFavoriteJobs: asyncHandler(async (req, res) => {
        const favorites = await userProfileService.getFavoriteJobs(req.user.id);
        res.json(favorites);
    }),

    // Add job to favorites
    addFavorite: asyncHandler(async (req, res) => {
        const favorite = await userProfileService.addFavorite(req.user.id, req.body.jobId);
        res.status(201).json({
            message: 'Job added to favorites',
            favorite
        });
    }),

    // Remove job from favorites
    removeFavorite: asyncHandler(async (req, res) => {
        const result = await userProfileService.removeFavorite(req.user.id, req.params.jobId);
        res.json(result);
    })
};

module.exports = userProfileController;
