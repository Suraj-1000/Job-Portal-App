class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async findAll({
        where = {},
        include = [],
        exclude = [],
        order = [["createdAt", "DESC"]],
    } = {}) {
        const record = await this.model.findAll({
            where,
            attributes: {
                include,
                exclude,
            },
            order,
        });
        return record;
    }

    async findOne(where, { include = [], exclude: [] } = {}) {
        const record = await this.model.findOne({
            where,
            attributes: {
                include,
                exclude,
            },
        });

        if (!record) throw new Error("Failed to find data");

        return record;
    }

    async create(data, options = {}) {
        return await this.model.create(data, options);
    }

    async findById(id, options = {}) {
        const { include = [], exclude = [], ...rest } = options;
        const record = await this.model.findByPk(id, {
            attributes: {
                include,
                exclude,
            },
            ...rest
        });

        if (!record) throw new Error("Failed to find data");

        return record;
    }

    async update(id, data, options = {}) {
        const record = await this.findById(id, options);
        return await record.update(data, options);
    }

    async destroy(id, options = {}) {
        await this.findById(id, options);

        const record = await this.model.destroy({
            where: {
                id,
            },
            ...options
        });

        return record;
    }
}

module.exports = BaseRepository;
