// Generic CRUD controller for filter entities (Industry, Location, JobTitle)
const asyncHandler = require('@/middlewares/asyncHandler');

const createFilterController = (Model, modelName) => {
    return {
        // Get all
        getAll: asyncHandler(async (req, res) => {
            const items = await Model.findAll({
                order: [['name', 'ASC']]
            });
            res.json(items);
        }),

        // Get by ID
        getById: asyncHandler(async (req, res) => {
            const item = await Model.findByPk(req.params.id);
            if (!item) {
                res.status(404);
                throw new Error(`${modelName} not found`);
            }
            res.json(item);
        }),

        // Create
        create: asyncHandler(async (req, res) => {
            const { name, status } = req.body;

            if (!name || !name.trim()) {
                res.status(400);
                throw new Error('Name is required');
            }

            const item = await Model.create({
                name: name.trim(),
                status: status || 'active'
            });

            res.status(201).json(item);
        }),

        // Update
        update: asyncHandler(async (req, res) => {
            const item = await Model.findByPk(req.params.id);

            if (!item) {
                res.status(404);
                throw new Error(`${modelName} not found`);
            }

            const { name, status } = req.body;

            if (name !== undefined) item.name = name.trim();
            if (status !== undefined) item.status = status;

            await item.save();
            res.json(item);
        }),

        // Delete
        delete: asyncHandler(async (req, res) => {
            const item = await Model.findByPk(req.params.id);

            if (!item) {
                res.status(404);
                throw new Error(`${modelName} not found`);
            }

            await item.destroy();
            res.status(204).send();
        })
    };
};

module.exports = createFilterController;
