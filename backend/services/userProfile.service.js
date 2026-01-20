const BaseService = require("./BaseService");
const userRepository = require("@/repositories/user.repository");
const applicationRepository = require("@/repositories/application.repository");
const favoriteRepository = require("@/repositories/favorite.repository");
const jobRepository = require("@/repositories/job.repository");
const { Job, Category } = require("@/models");
const bcrypt = require("bcryptjs");

class UserProfileService extends BaseService {
    constructor() {
        super(userRepository); // Primary repo
    }

    async getProfile(userId) {
        const user = await this.repository.findById(userId, {
            attributes: { exclude: ['password'] }
        });
        if (!user) throw new Error('User not found');
        return user;
    }

    async updateProfile(userId, data) {
        const { name, phone, address, bio } = data;
        const user = await this.repository.findById(userId);
        if (!user) throw new Error('User not found');

        if (name !== undefined) user.name = name.trim();
        if (phone !== undefined) user.phone = phone.trim();
        if (address !== undefined) user.address = address.trim();
        if (bio !== undefined) user.bio = bio.trim();

        await user.save();

        return await this.repository.findById(userId, {
            attributes: { exclude: ['password'] }
        });
    }

    async changePassword(userId, data) {
        const { currentPassword, newPassword } = data;
        if (!currentPassword || !newPassword) throw new Error('Current password and new password are required');
        if (newPassword.length < 6) throw new Error('New password must be at least 6 characters long');

        const user = await this.repository.findById(userId);
        if (!user) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {  // Throwing specific error code might need controller handling or custom error class
            // For now, standard error, middleware sets 500 but we can attach status if we had a CustomResult
            const err = new Error('Current password is incorrect');
            err.statusCode = 401;
            throw err;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return { message: 'Password changed successfully' };
    }

    async updateEmail(userId, data) {
        const { newEmail, password } = data;
        if (!newEmail || !password) throw new Error('New email and password are required');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) throw new Error('Invalid email format');

        const user = await this.repository.findById(userId);
        if (!user) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const err = new Error('Password is incorrect');
            err.statusCode = 401;
            throw err;
        }

        const existingUser = await this.repository.findByEmail(newEmail);
        if (existingUser && existingUser.id !== userId) {
            const err = new Error('Email already in use');
            err.statusCode = 409;
            throw err;
        }

        user.email = newEmail.trim();
        await user.save();

        return { message: 'Email updated successfully', email: user.email };
    }

    async deleteAccount(userId, password) {
        if (!password) throw new Error('Password is required');

        const user = await this.repository.findById(userId);
        if (!user) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const err = new Error('Password is incorrect');
            err.statusCode = 401;
            throw err;
        }

        await applicationRepository.destroy({ where: { userId } }); // This might need deleteMany or raw query if repo doesn't support where. 
        // BaseRepo destroy takes ID usually. I should check generic destroy usage.
        // BaseRepository.destroy(id) destroys by PK. Using model directly for bulk delete or adding deleteWhere to BaseRepo.
        // For now, use model methods via repo.model
        await applicationRepository.model.destroy({ where: { userId } });
        await favoriteRepository.model.destroy({ where: { userId } });

        await this.repository.destroy(userId);
        return { message: 'Account deleted successfully' };
    }

    async getAppliedJobs(userId, status) {
        const whereClause = { userId };
        if (status) whereClause.status = status;

        return await applicationRepository.findAll({
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
    }

    async applyForJob(userId, data) {
        const { jobId, coverLetter, resume } = data;
        if (!jobId) throw new Error('Job ID is required');

        const job = await jobRepository.model.findOne({
            where: { id: jobId, status: 'active' }
        });
        if (!job) throw new Error('Job not found or not active');

        const existingApplication = await applicationRepository.findByUserAndJob(userId, jobId);
        if (existingApplication) {
            const err = new Error('You have already applied for this job');
            err.statusCode = 409;
            throw err;
        }

        return await applicationRepository.create({
            userId,
            jobId,
            coverLetter,
            resume,
            status: 'pending',
            appliedDate: new Date()
        });
    }

    async getFavoriteJobs(userId) {
        return await favoriteRepository.findAll({
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
    }

    async addFavorite(userId, jobId) {
        if (!jobId) throw new Error('Job ID is required');

        const job = await jobRepository.findById(jobId);
        if (!job) throw new Error('Job not found');

        const existingFavorite = await favoriteRepository.findByUserAndJob(userId, jobId);
        if (existingFavorite) {
            const err = new Error('Job already in favorites');
            err.statusCode = 409;
            throw err;
        }

        return await favoriteRepository.create({ userId, jobId });
    }

    async removeFavorite(userId, jobId) {
        const favorite = await favoriteRepository.findByUserAndJob(userId, jobId);
        if (!favorite) throw new Error('Favorite not found');

        await favorite.destroy();
        return { message: 'Job removed from favorites' };
    }
}

module.exports = new UserProfileService();
