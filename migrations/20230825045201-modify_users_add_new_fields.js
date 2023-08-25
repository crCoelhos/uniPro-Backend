'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     return Promise.all([
      queryInterface.addColumn(
        'Users', // table name
        'registration', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'registration');

  }
};
