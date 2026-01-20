const BaseRepository = require("@/repositories/BaseRepository");
const { Application } = require("@/models");

class ApplicationRepository extends BaseRepository {
    constructor() {
        super(Application);
    }

    async findByUserAndJob(userId, jobId) {
        return await this.model.findOne({ where: { userId, jobId } });
    }
}

module.exports = new ApplicationRepository();
