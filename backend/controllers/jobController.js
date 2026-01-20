const jobService = require('@/services/job.service');
const asyncHandler = require('@/middlewares/asyncHandler');

const jobController = {
    create: asyncHandler(async (req, res) => {
        const job = await jobService.createJob(req.body);
        res.status(201).json(job);
    }),

    getAll: asyncHandler(async (req, res) => {
        const jobs = await jobService.getAllJobs();
        res.status(200).json(jobs);
    }),

    update: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const job = await jobService.updateJob(id, req.body);
        res.status(200).json(job);
    }),

    delete: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const result = await jobService.deleteJob(id);
        res.status(200).json(result);
    })
};

module.exports = jobController;
