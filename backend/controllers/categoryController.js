const categoryService = require('@/services/category.service');
const asyncHandler = require('@/middlewares/asyncHandler');

const categoryController = {
    create: asyncHandler(async (req, res) => {
        const category = await categoryService.createCategory(req.body);
        res.status(201).json(category);
    }),

    getAll: asyncHandler(async (req, res) => {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    }),

    update: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const category = await categoryService.updateCategory(id, req.body);
        res.status(200).json(category);
    }),

    delete: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const result = await categoryService.deleteCategory(id);
        res.status(200).json(result);
    })
};

module.exports = categoryController;
