'use strict';
const { v4: uuidv4 } = require('uuid')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userTicketsData = [
      {
        id: uuidv4(),
        athleticId: 1,
        userId: 1,
        ticketId: '53faefcf-804d-4bcc-aa2a-ef7d4ce2205f',
        eventId: 1,
        status: 'processando',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        athleticId: 2,
        userId: 2,
        ticketId: 'be1f5416-b663-49d9-9d29-69fac2ed84e9',
        eventId: 2,
        status: 'aguardando',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('User_tickets', userTicketsData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User_tickets', null, {});
  },
};
