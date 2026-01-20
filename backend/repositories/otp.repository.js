const BaseRepository = require("@/repositories/BaseRepository");
const { Otp } = require("@/models");

class OtpRepository extends BaseRepository {
    constructor() {
        super(Otp);
    }

    async deleteByType(email, type) {
        return await this.model.destroy({ where: { email: email.toLowerCase(), type } });
    }

    async findValidOtp(email, otp, type) {
        const { Op } = require('sequelize');
        return await this.model.findOne({
            where: {
                email: email.toLowerCase(),
                otp,
                type,
                verified: false,
                expiresAt: { [Op.gt]: new Date() }
            }
        });
    }

    async findVerifiedOtp(email, otp, type) {
        const { Op } = require('sequelize');
        return await this.model.findOne({
            where: {
                email: email.toLowerCase(),
                otp,
                type,
                verified: true,
                expiresAt: { [Op.gt]: new Date() }
            }
        });
    }
}

module.exports = new OtpRepository();
