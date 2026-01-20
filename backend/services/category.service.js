const BaseService = require("@/services/BaseService");
const categoryRepository = require("@/repositories/category.repository");

class CategoryService extends BaseService {
    constructor() {
        super(categoryRepository);
    }

    async createCategory(data) {
        const { name, status } = data;
        const category = await this.repository.create({ name, status });
        return category;
    }

    async getAllCategories() {
        return await this.repository.findAll();
    }

    async updateCategory(id, data) {
        const { name, status } = data;
        const category = await this.repository.findById(id);

        if (!category) {
            throw new Error('Category not found');
        }

        return await this.repository.update(id, { name, status });
    }

    async deleteCategory(id) {
        const category = await this.repository.findById(id);

        if (!category) {
            throw new Error('Category not found');
        }

        await this.repository.destroy(id);
        return { message: 'Category deleted successfully' };
    }
}

module.exports = new CategoryService();
