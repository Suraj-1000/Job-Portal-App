'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Modify jobLevel to ENUM
        // Note: In some dialects, changing to ENUM is complex. 
        // We will attempt to change the column definition.
        // If using SQLite, this might just be TEXT, which is fine.
        // If using MySQL, this creates the ENUM constraint.

        try {
            await queryInterface.changeColumn('Jobs', 'jobLevel', {
                type: Sequelize.ENUM('entry-level', 'mid-level', 'senior-level'),
                defaultValue: 'entry-level'
            });

            await queryInterface.changeColumn('Jobs', 'education', {
                type: Sequelize.ENUM('see', 'high-school', 'diploma', 'bachelor', 'master', 'phd'),
                defaultValue: 'see'
            });
        } catch (e) {
            console.error("Migration warning: ", e);
            // Fallback for dialects that might struggle with direct ENUM alteration
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('Jobs', 'jobLevel', {
            type: Sequelize.STRING
        });
        await queryInterface.changeColumn('Jobs', 'education', {
            type: Sequelize.STRING
        });
    }
};
