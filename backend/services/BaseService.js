class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    response(success, message, data = null) {
        return { success, message, ...(data != null && { data }) };
    }
}

module.exports = BaseService;
