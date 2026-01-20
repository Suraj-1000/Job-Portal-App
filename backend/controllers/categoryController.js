const { Category } = require('../models');

const categoryController = {
    create: async (req, res) => {
        try {
            const { name, status } = req.body;
            const category = await Category.create({ name, status });
            res.status(201).json(category);
        } catch (error) {
            console.error('Error creating category:', error);
            res.status(500).json({ message: 'Error creating category', error: error.message });
        }
    },

    getAll: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            res.status(500).json({ message: 'Error fetching categories', error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, status } = req.body;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await category.update({ name, status });
            res.status(200).json(category);
        } catch (error) {
            console.error('Error updating category:', error);
            res.status(500).json({ message: 'Error updating category', error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            const { id } = req.params;
            const category = await Category.findByPk(id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            await category.destroy();
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ message: 'Error deleting category', error: error.message });
        }
    }
};

module.exports = categoryController;
