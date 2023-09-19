'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Types_tickets', [
      {
        name:"Pacote Bronze",
        qt_modalities: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Pacote Prata",
        qt_modalities: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Pacote Ouro",
        qt_modalities: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Pacote Diamante",
        qt_modalities: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Torcedor Simples",
        qt_modalities: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Torcedor Completo",
        qt_modalities: 14,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Torcedor",
        qt_modalities: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Types_tickets', null, {});
  }
};
