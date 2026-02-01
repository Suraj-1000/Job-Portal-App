const BaseService = require("@/services/BaseService");
const userRepository = require("@/repositories/user.repository");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { envConfig } = require("@/config");
const { isSuperAdminEmail } = require("@/config/superadmin");

class AuthService extends BaseService {
    constructor() {
        super(userRepository);
    }

    async registerUser(data) {
        const { firstName, lastName, email, password } = data;

        if (!firstName || !lastName || !email || !password) {
            throw new Error("All fields are required");
        }

        const existingUser = await this.repository.model.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            throw new Error("Email already exists");
        }

        const hashed = await bcrypt.hash(password, 10);

        let userRole = 'user';
        if (typeof isSuperAdminEmail === 'function' && isSuperAdminEmail(email.toLowerCase())) {
            userRole = 'superadmin';
        }

        const user = await this.repository.create({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.toLowerCase().trim(),
            password: hashed,
            role: userRole
        });

        const userResponse = user.toJSON();
        delete userResponse.password;

        return this.response(true, "User registered successfully", { user: userResponse });
    }

    async loginUser(data) {
        const { email, password } = data;

        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const user = await this.repository.model.findOne({ where: { email: email.toLowerCase() } });
        if (!user) {
            throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }

        user.lastLogin = new Date();
        await user.save();

        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            envConfig.JWT_SECRET,
            { expiresIn: envConfig.JWT_ACCESS_EXPIRY }
        );

        const refreshToken = jwt.sign(
            { id: user.id },
            envConfig.JWT_REFRESH_SECRET,
            { expiresIn: envConfig.JWT_REFRESH_EXPIRY }
        );

        const userResponse = user.toJSON();
        delete userResponse.password;

        return {
            message: "Login successful",
            accessToken,
            refreshToken,
            user: userResponse
        };
    }
}

module.exports = new AuthService();
