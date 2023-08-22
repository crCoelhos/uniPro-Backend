'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Types_tickets', [

      {
        name:"Atleta Bronze",
        qt_modalities: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Atleta Prata",
        qt_modalities: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Atleta Ouro",
        qt_modalities: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Tocedor Simples",
        qt_modalities: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Tocedor Completo",
        qt_modalities: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Types_tickets', null, {});
  }
};
