'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'User_tickets', // table name
        'athleticId', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:'Athletics',
            key: 'id'
          }
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('User_tickets', 'athleticId')
  }
};
