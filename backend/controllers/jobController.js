const { Job, Category } = require('../models');

const jobController = {
    create: async (req, res) => {
        try {
            const {
                title, description, companyName, location, salary, type, status, categoryId,
                openings, industry, jobLevel, education, experience, expiryDate, skills, desiredCandidate
            } = req.body;

            const job = await Job.create({
                title,
                description,
                companyName,
                location,
                salary,
                type,
                status,
                categoryId,
                openings,
                industry,
                jobLevel,
                education,
                experience,
                expiryDate,
                skills,
                desiredCandidate
            });

            res.status(201).json(job);
        } catch (error) {
            console.error('Error creating job:', error);
            res.status(500).json({ message: 'Error creating job', error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const jobs = await Job.findAll({
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }],
                order: [['createdAt', 'DESC']]
            });
            res.status(200).json(jobs);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            res.status(500).json({ message: 'Error fetching jobs', error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                title, description, companyName, location, salary, type, status, categoryId,
                openings, industry, jobLevel, education, experience, expiryDate, skills, desiredCandidate
            } = req.body;

            const job = await Job.findByPk(id);

            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }

            await job.update({
                title,
                description,
                companyName,
                location,
                salary,
                type,
                status,
                categoryId,
                openings,
                industry,
                jobLevel,
                education,
                experience,
                expiryDate,
                skills,
                desiredCandidate
            });

            res.status(200).json(job);
        } catch (error) {
            console.error('Error updating job:', error);
            res.status(500).json({ message: 'Error updating job', error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const job = await Job.findByPk(id);

            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }

            await job.destroy();
            res.status(200).json({ message: 'Job deleted successfully' });
        } catch (error) {
            console.error('Error deleting job:', error);
            res.status(500).json({ message: 'Error deleting job', error: error.message });
        }
    }
};

module.exports = jobController;
