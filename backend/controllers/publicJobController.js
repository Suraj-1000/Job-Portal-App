const { Job, Category, Industry, Location, JobTitle } = require('../models');
const { Op } = require('sequelize');
const db = require('../models');

const publicJobController = {
    // Get all public jobs with filters
    getPublicJobs: async (req, res) => {
        try {
            const {
                category,
                industry,
                location,
                title,
                search,
                type,
                jobLevel,
                page = 1,
                limit = 10
            } = req.query;

            const whereClause = {
                status: 'active',
                expiryDate: {
                    [Op.or]: [
                        { [Op.gte]: new Date() },
                        { [Op.is]: null }
                    ]
                }
            };

            // Apply filters
            if (category) {
                const categoryRecord = await Category.findOne({ where: { name: category } });
                if (categoryRecord) {
                    whereClause.categoryId = categoryRecord.id;
                }
            }

            if (industry) {
                whereClause.industry = industry;
            }

            if (location) {
                whereClause.location = location;
            }

            if (title) {
                whereClause.title = {
                    [Op.like]: `%${title}%`
                };
            }

            if (type) {
                whereClause.type = type;
            }

            if (jobLevel) {
                whereClause.jobLevel = jobLevel;
            }

            // Search across multiple fields
            if (search) {
                whereClause[Op.or] = [
                    { title: { [Op.like]: `%${search}%` } },
                    { companyName: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } },
                    { skills: { [Op.like]: `%${search}%` } }
                ];
            }

            const offset = (page - 1) * limit;

            const { count, rows: jobs } = await Job.findAndCountAll({
                where: whereClause,
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }],
                order: [['createdAt', 'DESC']],
                limit: parseInt(limit),
                offset: parseInt(offset)
            });

            res.json({
                jobs,
                pagination: {
                    total: count,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(count / limit)
                }
            });
        } catch (error) {
            console.error('Error fetching public jobs:', error);
            res.status(500).json({ message: 'Error fetching jobs', error: error.message });
        }
    },

    // Get categories with job counts
    getCategoriesWithCounts: async (req, res) => {
        try {
            const categories = await Category.findAll({
                where: { status: 'active' },
                attributes: [
                    'id',
                    'name',
                    [
                        db.sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM "Jobs" AS "Jobs"
                            WHERE "Jobs"."categoryId" = "Category"."id"
                            AND "Jobs"."status" = 'active'
                            AND ("Jobs"."expiryDate" >= CURRENT_DATE OR "Jobs"."expiryDate" IS NULL)
                        )`),
                        'jobCount'
                    ]
                ],
                order: [['name', 'ASC']]
            });


            res.json(categories);
        } catch (error) {
            console.error('Error fetching categories with counts:', error);
            res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
    },

    // Get filter options
    getFilterOptions: async (req, res) => {
        try {
            const [industries, locations, jobTitles] = await Promise.all([
                Industry.findAll({
                    where: { status: 'active' },
                    attributes: ['id', 'name'],
                    order: [['name', 'ASC']]
                }),
                Location.findAll({
                    where: { status: 'active' },
                    attributes: ['id', 'name'],
                    order: [['name', 'ASC']]
                }),
                JobTitle.findAll({
                    where: { status: 'active' },
                    attributes: ['id', 'name'],
                    order: [['name', 'ASC']]
                })
            ]);

            res.json({
                industries,
                locations,
                jobTitles
            });
        } catch (error) {
            console.error('Error fetching filter options:', error);
            res.status(500).json({ message: 'Error fetching filter options', error: error.message });
        }
    },

    // Get single job details
    getJobById: async (req, res) => {
        try {
            const { id } = req.params;

            const job = await Job.findOne({
                where: {
                    id,
                    status: 'active'
                },
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name']
                }]
            });

            if (!job) {
                return res.status(404).json({ message: 'Job not found' });
            }

            res.json(job);
        } catch (error) {
            console.error('Error fetching job:', error);
            res.status(500).json({ message: 'Error fetching job', error: error.message });
        }
    }
};

module.exports = publicJobController;
