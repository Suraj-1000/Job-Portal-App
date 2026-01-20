const BaseRepository = require("@/repositories/BaseRepository");
const { User } = require("@/models");

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return await this.findOne({ email });
    }
}

module.exports = new UserRepository();
