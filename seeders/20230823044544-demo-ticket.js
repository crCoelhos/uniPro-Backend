'use strict';
//const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ticketsData = [
      {
        //id: uuidv4(),
        id: '53faefcf-804d-4bcc-aa2a-ef7d4ce2205f',
        name: 'Ticket 1',
        price: 50.00,
        startDate: new Date('2023-08-25'),
        finishDate: new Date('2023-08-26'),
        typeTicketId: 1,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        //id: uuidv4(),
        id: 'be1f5416-b663-49d9-9d29-69fac2ed84e9',
        name: 'Ticket 2',
        price: 30.00,
        startDate: new Date('2023-08-25'),
        finishDate: new Date('2023-08-27'),
        typeTicketId: 2,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Tickets', ticketsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tickets', null, {});
  },
};