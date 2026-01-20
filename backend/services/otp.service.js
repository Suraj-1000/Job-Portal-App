const BaseService = require("@/services/BaseService");
const otpRepository = require("@/repositories/otp.repository");
const userRepository = require("@/repositories/user.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { envConfig } = require("@/config");
const { sendOTPEmail } = require("@/utils/emailService");
const { isSuperAdminEmail } = require("@/config/superadmin");

class OtpService extends BaseService {
    constructor() {
        super(otpRepository);
    }

    _generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    async sendSignupOTP(email) {
        if (!email) throw new Error('Email is required');

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) throw new Error('Email already exists');

        const otp = this._generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await this.repository.deleteByType(email, 'signup');
        await this.repository.create({
            email: email.toLowerCase(),
            otp,
            type: 'signup',
            expiresAt
        });

        await sendOTPEmail(email, otp, 'signup');
        return { success: true, message: 'OTP sent to your email' };
    }

    async verifySignupOTP(data) {
        const { firstName, lastName, email, password, otp } = data;
        if (!firstName || !lastName || !email || !password || !otp) {
            throw new Error('All fields are required');
        }

        const otpRecord = await this.repository.findValidOtp(email, otp, 'signup');
        if (!otpRecord) throw new Error('Invalid or expired OTP');

        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) throw new Error('Email already exists');

        otpRecord.verified = true;
        await otpRecord.save();

        let role = 'user';
        if (typeof isSuperAdminEmail === 'function' && isSuperAdminEmail(email.toLowerCase())) {
            role = 'superadmin';
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await userRepository.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            password: hashed,
            role
        });

        await otpRecord.destroy();

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign(
            { id: user.id, role: user.role },
            envConfig.JWT_SECRET,
            { expiresIn: envConfig.JWT_ACCESS_EXPIRY || '1h' }
        );

        const userResponse = user.toJSON();
        delete userResponse.password;

        return { success: true, message: 'Account created successfully', token, user: userResponse };
    }

    async sendLoginOTP(email) {
        if (!email) throw new Error('Email is required');

        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('User not found');

        const otp = this._generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await this.repository.deleteByType(email, 'login');
        await this.repository.create({
            email: email.toLowerCase(),
            otp,
            type: 'login',
            expiresAt
        });

        await sendOTPEmail(email, otp, 'login');
        return { success: true, message: 'OTP sent to your email' };
    }

    async verifyLoginOTP(data) {
        const { email, otp } = data;
        if (!email || !otp) throw new Error('Email and OTP are required');

        const otpRecord = await this.repository.findValidOtp(email, otp, 'login');
        if (!otpRecord) throw new Error('Invalid or expired OTP');

        otpRecord.verified = true;
        await otpRecord.save();

        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('User not found');

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign(
            { id: user.id, role: user.role },
            envConfig.JWT_SECRET,
            { expiresIn: envConfig.JWT_ACCESS_EXPIRY || '1h' }
        );

        const userResponse = user.toJSON();
        delete userResponse.password;

        return { success: true, message: 'Login successful', token, user: userResponse };
    }

    async sendForgotPasswordOTP(email) {
        if (!email) throw new Error('Email is required');

        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('User not found');

        const otp = this._generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await this.repository.deleteByType(email, 'forgot-password');
        await this.repository.create({
            email: email.toLowerCase(),
            otp,
            type: 'forgot-password',
            expiresAt
        });

        await sendOTPEmail(email, otp, 'forgot-password');
        return { success: true, message: 'OTP sent to your email' };
    }

    async verifyForgotPasswordOTP(data) {
        const { email, otp } = data;
        if (!email || !otp) throw new Error('Email and OTP are required');

        const otpRecord = await this.repository.findValidOtp(email, otp, 'forgot-password');
        if (!otpRecord) throw new Error('Invalid or expired OTP');

        otpRecord.verified = true;
        await otpRecord.save();

        return { success: true, message: 'OTP verified successfully' };
    }

    async resetPasswordWithOTP(data) {
        const { email, otp, newPassword } = data;
        if (!email || !otp || !newPassword) throw new Error('Email, OTP, and new password are required');
        if (newPassword.length < 6) throw new Error('Password must be at least 6 characters');

        const otpRecord = await this.repository.findVerifiedOtp(email, otp, 'forgot-password');
        if (!otpRecord) throw new Error('Invalid or expired OTP. Please verify OTP again.');

        const user = await userRepository.findByEmail(email);
        if (!user) throw new Error('User not found');

        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;
        await user.save();

        await otpRecord.destroy();

        return { success: true, message: 'Password reset successfully' };
    }
}

module.exports = new OtpService();
