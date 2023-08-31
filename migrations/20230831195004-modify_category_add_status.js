'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Categories', // table name
        'status', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue:false
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Categories', 'status');
  }
};
