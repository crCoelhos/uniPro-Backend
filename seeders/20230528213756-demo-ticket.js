'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tickets', [
      {
        name: 'Noob',
        price: 105,
        sold: false,
        inProcessing: false,
        lotId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Casual',
        price: 130,
        sold: false,
        inProcessing: false,
        lotId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pro',
        price: 155,
        sold: false,
        inProcessing: false,
        lotId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Noob',
        price: 115,
        sold: false,
        inProcessing: false,
        lotId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Casual',
        price: 140,
        sold: false,
        inProcessing: false,
        lotId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pro',
        price: 165,
        sold: false,
        inProcessing: false,
        lotId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tickets', null, {});
  }
};
