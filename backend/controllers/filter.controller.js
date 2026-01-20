// Generic CRUD controller for filter entities (Industry, Location, JobTitle)
const createFilterController = (Model, modelName) => {
    return {
        // Get all
        getAll: async (req, res) => {
            try {
                const items = await Model.findAll({
                    order: [['name', 'ASC']]
                });
                res.json(items);
            } catch (error) {
                console.error(`Error fetching ${modelName}:`, error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        },

        // Get by ID
        getById: async (req, res) => {
            try {
                const item = await Model.findByPk(req.params.id);
                if (!item) {
                    return res.status(404).json({ message: `${modelName} not found` });
                }
                res.json(item);
            } catch (error) {
                console.error(`Error fetching ${modelName}:`, error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        },

        // Create
        create: async (req, res) => {
            try {
                const { name, status } = req.body;

                if (!name || !name.trim()) {
                    return res.status(400).json({ message: 'Name is required' });
                }

                const item = await Model.create({
                    name: name.trim(),
                    status: status || 'active'
                });

                res.status(201).json(item);
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return res.status(409).json({ message: `${modelName} already exists` });
                }
                console.error(`Error creating ${modelName}:`, error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        },

        // Update
        update: async (req, res) => {
            try {
                const item = await Model.findByPk(req.params.id);

                if (!item) {
                    return res.status(404).json({ message: `${modelName} not found` });
                }

                const { name, status } = req.body;

                if (name !== undefined) item.name = name.trim();
                if (status !== undefined) item.status = status;

                await item.save();
                res.json(item);
            } catch (error) {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    return res.status(409).json({ message: `${modelName} name already exists` });
                }
                console.error(`Error updating ${modelName}:`, error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        },

        // Delete
        delete: async (req, res) => {
            try {
                const item = await Model.findByPk(req.params.id);

                if (!item) {
                    return res.status(404).json({ message: `${modelName} not found` });
                }

                await item.destroy();
                res.status(204).send();
            } catch (error) {
                console.error(`Error deleting ${modelName}:`, error);
                res.status(500).json({ message: 'Server error', error: error.message });
            }
        }
    };
};

module.exports = createFilterController;
