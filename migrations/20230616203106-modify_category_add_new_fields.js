'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Categories', // table name
        'typeTicketId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          references:{
            model:'Types_tickets',
            key: 'id'
          }
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Categories', 'typeTicketId')
  }
};
