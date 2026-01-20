const BaseService = require("@/services/BaseService");
const jobRepository = require("@/repositories/job.repository");
const { Category } = require("@/models");

class JobService extends BaseService {
    constructor() {
        super(jobRepository);
    }

    async createJob(data) {
        return await this.repository.create(data);
    }

    async getAllJobs() {
        return await this.repository.findAll({
            include: [{
                model: Category,
                as: 'category',
                attributes: ['name']
            }],
            order: [['createdAt', 'DESC']]
        });
    }

    async updateJob(id, data) {
        const job = await this.repository.findById(id);
        if (!job) {
            throw new Error('Job not found');
        }
        return await this.repository.update(id, data);
    }

    async deleteJob(id) {
        const job = await this.repository.findById(id);
        if (!job) {
            throw new Error('Job not found');
        }
        await this.repository.destroy(id);
        return { message: 'Job deleted successfully' };
    }
}

module.exports = new JobService();
