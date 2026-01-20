'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash('password123', 10);
    const users = [];

    // 1 Admin
    users.push({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: password,
      role: 'admin',
      phone: '1234567890',
      gender: 'Male',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // 2 Staff
    for (let i = 1; i <= 2; i++) {
      users.push({
        firstName: `Staff`,
        lastName: `${i}`,
        email: `staff${i}@example.com`,
        password: password,
        role: 'staff',
        phone: `123456789${i}`,
        gender: i % 2 === 0 ? 'Female' : 'Male',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    // 5 Regular Users
    for (let i = 1; i <= 5; i++) {
      users.push({
        firstName: `User`,
        lastName: `${i}`,
        email: `user${i}@example.com`,
        password: password,
        role: 'user',
        phone: `987654321${i}`,
        gender: i % 2 === 0 ? 'Female' : 'Male',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
