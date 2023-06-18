'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Types_tickets', [

      {
        name:"Atleta Bronze",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Atleta Prata",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Atleta Ouro",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Tocedor Simples",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name:"Tocedor Completo",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Types_tickets', null, {});
  }
};
