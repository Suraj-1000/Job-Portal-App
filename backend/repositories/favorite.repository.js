const BaseRepository = require("@/repositories/BaseRepository");
const { Favorite } = require("@/models");

class FavoriteRepository extends BaseRepository {
    constructor() {
        super(Favorite);
    }

    async findByUserAndJob(userId, jobId) {
        return await this.model.findOne({ where: { userId, jobId } });
    }
}

module.exports = new FavoriteRepository();
