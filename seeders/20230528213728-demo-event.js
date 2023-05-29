'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Events', [
      {
        name: "Carnval encerrado",
        state: false,
        date: "2023-10-07",
        location: "afafgarafa",
        description: "Abimael",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Carnval",
        state: true,
        date: "2023-10-07",
        location: "afafgarafa",
        description: "Abimael",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Jogos Uni",
        state: true,
        date: "2023-10-07",
        location: "afafgarafa",
        description: "JOGOS JOGOS",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Events', null, {});

  }
};
