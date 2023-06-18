'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Tickets', // table name
        'typeTicketId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:'Types_tickets',
            key: 'id'
          }
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Tickets', 'typeTicketId')
  }
};
