'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Tickets', // table name
        'pre', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue:false
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Tickets', 'pre');
  }
};
