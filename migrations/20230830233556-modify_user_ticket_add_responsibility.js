'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'User_tickets', // table name
        'responsibility', // new field name
        {
          type: Sequelize.ENUM('Ps', 'Vc', 'Dr', 'Aa', 'Ts', 'Tc'),
          allowNull: false,
          
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('User_tickets', 'responsibility')
  }
};
