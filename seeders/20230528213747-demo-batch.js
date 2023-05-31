'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Batchs', [
      {
        name: '1º Lote',
        startDate: '2023-10-07',
        finishDate: '2023-10-14',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '2º Lote',
        startDate: '2023-10-14',
        finishDate: '2023-10-21',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '1º Lote',
        startDate: '2023-10-07',
        finishDate: '2023-10-14',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '2º Lote',
        startDate: '2023-10-14',
        finishDate: '2023-10-21',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '1º Lote',
        startDate: '2023-10-07',
        finishDate: '2023-10-14',
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '2º Lote',
        startDate: '2023-10-14',
        finishDate: '2023-10-21',
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Batchs', null, {});
  }
};
