'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash('superadmin123', 10);
        return queryInterface.bulkInsert('Users', [{
            firstName: 'Super',
            lastName: 'Admin',
            email: 'superadmin@example.com',
            password: hashedPassword,
            role: 'superadmin',
            createdAt: new Date(),
            updatedAt: new Date(),
            lastLogin: null
        }], {});
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', { email: 'superadmin@example.com' }, {});
    }
};
