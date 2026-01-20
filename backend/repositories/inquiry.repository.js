const BaseRepository = require("@/repositories/BaseRepository");
const { Inquiry } = require("@/models");

class InquiryRepository extends BaseRepository {
    constructor() {
        super(Inquiry);
    }
}

module.exports = new InquiryRepository();
