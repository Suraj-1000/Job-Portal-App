const BaseRepository = require("@/repositories/BaseRepository");
const { Category } = require("@/models");

class CategoryRepository extends BaseRepository {
    constructor() {
        super(Category);
    }
}

module.exports = new CategoryRepository();
