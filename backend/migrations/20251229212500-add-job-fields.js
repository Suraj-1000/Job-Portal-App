'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Jobs', 'openings', {
            type: Sequelize.INTEGER,
            defaultValue: 1
        });
        await queryInterface.addColumn('Jobs', 'industry', {
            type: Sequelize.STRING
        });
        await queryInterface.addColumn('Jobs', 'jobLevel', {
            type: Sequelize.STRING // Entry Level, Mid Level, Senior Level
        });
        await queryInterface.addColumn('Jobs', 'education', {
            type: Sequelize.STRING
        });
        await queryInterface.addColumn('Jobs', 'experience', {
            type: Sequelize.STRING
        });
        await queryInterface.addColumn('Jobs', 'expiryDate', {
            type: Sequelize.DATEONLY
        });
        await queryInterface.addColumn('Jobs', 'skills', {
            type: Sequelize.TEXT
        });
        await queryInterface.addColumn('Jobs', 'desiredCandidate', {
            type: Sequelize.TEXT // Rich text content
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Jobs', 'openings');
        await queryInterface.removeColumn('Jobs', 'industry');
        await queryInterface.removeColumn('Jobs', 'jobLevel');
        await queryInterface.removeColumn('Jobs', 'education');
        await queryInterface.removeColumn('Jobs', 'experience');
        await queryInterface.removeColumn('Jobs', 'expiryDate');
        await queryInterface.removeColumn('Jobs', 'skills');
        await queryInterface.removeColumn('Jobs', 'desiredCandidate');
    }
};
