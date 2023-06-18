'use strict';
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [
      {
        id: uuidv4(),
        name: 'Noob 1º lote',
        price: 105,
        quantity: 10,
        startDate: '2023-10-07',
        finishDate: '2023-11-05',
        typeTicketId: 1,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Casual 1º lote',
        price: 130,
        quantity: 10,
        startDate: '2023-10-07',
        finishDate: '2023-11-05',
        typeTicketId: 2,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Pro 1º lote',
        price: 155,
        quantity: 10,
        startDate: '2023-10-07',
        finishDate: '2023-11-05',
        typeTicketId: 3,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Noob 2º lote',
        price: 115,
        quantity: 10,
        startDate: '2023-11-05',
        finishDate: '2023-12-05',
        typeTicketId: 1,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Casual 2º lote',
        price: 140,
        quantity: 10,
        startDate: '2023-11-05',
        finishDate: '2023-12-05',
        typeTicketId: 2,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        name: 'Pro 2º lote',
        price: 165,
        quantity: 10,
        startDate: '2023-11-05',
        finishDate: '2023-12-05',
        typeTicketId: 3,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
