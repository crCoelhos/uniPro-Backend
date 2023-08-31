'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'User_tickets', // table name
        'categoryId', // new field name
        {
          type: Sequelize.ENUM(''),
          allowNull: false,
          
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('User_tickets', 'categoryId')
  }
};
