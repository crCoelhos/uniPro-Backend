'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tickets', [
      {
        name: 'Noob',
        price: 105,
        status: true,
        inProcessing: false,
        batchId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Casual',
        price: 130,
        status: true,
        inProcessing: false,
        batchId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pro',
        price: 155,
        status: true,
        inProcessing: false,
        batchId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Noob',
        price: 115,
        status: true,
        inProcessing: false,
        batchId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Casual',
        price: 140,
        status: true,
        inProcessing: false,
        batchId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pro',
        price: 165,
        status: true,
        inProcessing: false,
        batchId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tickets', null, {});
  }
};
