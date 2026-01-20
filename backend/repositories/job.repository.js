const BaseRepository = require("@/repositories/BaseRepository");
const { Job } = require("@/models");

class JobRepository extends BaseRepository {
    constructor() {
        super(Job);
    }
}

module.exports = new JobRepository();
