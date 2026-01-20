const { User, Application, Favorite, Job, Category } = require('../models');
const bcrypt = require('bcryptjs');


const userProfileController = {
    // Get user profile
    getProfile: async (req, res) => {
        try {
            const userId = req.user.id;

            const user = await User.findByPk(userId, {
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ message: 'Error fetching profile', error: error.message });
        }
    },

    // Update user profile
    updateProfile: async (req, res) => {
        try {
            const userId = req.user.id;
            const { name, phone, address, bio } = req.body;

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Update fields
            if (name !== undefined) user.name = name.trim();
            if (phone !== undefined) user.phone = phone.trim();
            if (address !== undefined) user.address = address.trim();
            if (bio !== undefined) user.bio = bio.trim();

            await user.save();

            const updatedUser = await User.findByPk(userId, {
                attributes: { exclude: ['password'] }
            });

            res.json({
                message: 'Profile updated successfully',
                user: updatedUser
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ message: 'Error updating profile', error: error.message });
        }
    },

    // Change password
    changePassword: async (req, res) => {
        try {
            const userId = req.user.id;
            const { currentPassword, newPassword } = req.body;

            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    message: 'Current password and new password are required'
                });
            }

            if (newPassword.length < 6) {
                return res.status(400).json({
                    message: 'New password must be at least 6 characters long'
                });
            }

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify current password
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Current password is incorrect' });
            }

            // Hash new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await user.save();

            res.json({ message: 'Password changed successfully' });
        } catch (error) {
            console.error('Error changing password:', error);
            res.status(500).json({ message: 'Error changing password', error: error.message });
        }
    },

    // Update email
    updateEmail: async (req, res) => {
        try {
            const userId = req.user.id;
            const { newEmail, password } = req.body;

            if (!newEmail || !password) {
                return res.status(400).json({
                    message: 'New email and password are required'
                });
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(newEmail)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Password is incorrect' });
            }

            // Check if email already exists
            const existingUser = await User.findOne({ where: { email: newEmail } });
            if (existingUser && existingUser.id !== userId) {
                return res.status(409).json({ message: 'Email already in use' });
            }

            user.email = newEmail.trim();
            await user.save();

            res.json({
                message: 'Email updated successfully',
                email: user.email
            });
        } catch (error) {
            console.error('Error updating email:', error);
            res.status(500).json({ message: 'Error updating email', error: error.message });
        }
    },

    // Delete account
    deleteAccount: async (req, res) => {
        try {
            const userId = req.user.id;
            const { password } = req.body;

            if (!password) {
                return res.status(400).json({ message: 'Password is required' });
            }

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Password is incorrect' });
            }

            // Delete related data
            await Application.destroy({ where: { userId } });
            await Favorite.destroy({ where: { userId } });

            // Delete user
            await user.destroy();

            res.json({ message: 'Account deleted successfully' });
        } catch (error) {
            console.error('Error deleting account:', error);
            res.status(500).json({ message: 'Error deleting account', error: error.message });
        }
    },

    // Get applied jobs
    getAppliedJobs: async (req, res) => {
        try {
            const userId = req.user.id;
            const { status } = req.query;

            const whereClause = { userId };
            if (status) {
                whereClause.status = status;
            }

            const applications = await Application.findAll({
                where: whereClause,
                include: [{
                    model: Job,
                    as: 'job',
                    include: [{
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }]
                }],
                order: [['appliedDate', 'DESC']]
            });

            res.json(applications);
        } catch (error) {
            console.error('Error fetching applied jobs:', error);
            res.status(500).json({ message: 'Error fetching applied jobs', error: error.message });
        }
    },

    // Apply for a job
    applyForJob: async (req, res) => {
        try {
            const userId = req.user.id;
            const { jobId, coverLetter, resume } = req.body;

            if (!jobId) {
                return res.status(400).json({ message: 'Job ID is required' });
            }

            // Check if job exists and is active
            const job = await Job.findOne({
                where: {
                    id: jobId,
                    status: 'active'
                }
            });

            if (!job) {
                return res.status(404).json({ message: 'Job not found or not active' });
            }

            // Check if already applied
            const existingApplication = await Application.findOne({
                where: { userId, jobId }
            });

            if (existingApplication) {
                return res.status(409).json({ message: 'You have already applied for this job' });
            }

            // Create application
            const application = await Application.create({
                userId,
                jobId,
                coverLetter,
                resume,
                status: 'pending',
                appliedDate: new Date()
            });

            res.status(201).json({
                message: 'Application submitted successfully',
                application
            });
        } catch (error) {
            console.error('Error applying for job:', error);
            res.status(500).json({ message: 'Error applying for job', error: error.message });
        }
    },

    // Get favorite jobs
    getFavoriteJobs: async (req, res) => {
        try {
            const userId = req.user.id;

            const favorites = await Favorite.findAll({
                where: { userId },
                include: [{
                    model: Job,
                    as: 'job',
                    include: [{
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name']
                    }]
                }],
                order: [['createdAt', 'DESC']]
            });

            res.json(favorites);
        } catch (error) {
            console.error('Error fetching favorite jobs:', error);
            res.status(500).json({ message: 'Error fetching favorite jobs', error: error.message });
        }
    },

    // Add job to favorites
    addFavorite: async (req, res) => {
        try {
            const userId = req.user.id;
            const { jobId } = req.body;

            if (!jobId) {
                return res.status(400).json({ message: 'Job ID is required' });
            }

            // Check if job exists
            const job = await Job.findByPk(jobId);
            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }

            // Check if already favorited
            const existingFavorite = await Favorite.findOne({
                where: { userId, jobId }
            });

            if (existingFavorite) {
                return res.status(409).json({ message: 'Job already in favorites' });
            }

            // Add to favorites
            const favorite = await Favorite.create({ userId, jobId });

            res.status(201).json({
                message: 'Job added to favorites',
                favorite
            });
        } catch (error) {
            console.error('Error adding favorite:', error);
            res.status(500).json({ message: 'Error adding favorite', error: error.message });
        }
    },

    // Remove job from favorites
    removeFavorite: async (req, res) => {
        try {
            const userId = req.user.id;
            const { jobId } = req.params;

            const favorite = await Favorite.findOne({
                where: { userId, jobId }
            });

            if (!favorite) {
                return res.status(404).json({ message: 'Favorite not found' });
            }

            await favorite.destroy();

            res.json({ message: 'Job removed from favorites' });
        } catch (error) {
            console.error('Error removing favorite:', error);
            res.status(500).json({ message: 'Error removing favorite', error: error.message });
        }
    }
};

module.exports = userProfileController;
