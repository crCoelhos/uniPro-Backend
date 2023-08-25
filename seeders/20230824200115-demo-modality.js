'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Modalities', [
      {
        name: 'Basquete 3x3',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vôlei indoor',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Futsal',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Handebol',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Atletismo',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Natação',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Futevôlei',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vôlei de areia',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Truco',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dominó',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pôquer',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sinuca',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xadrez',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tênis de mesa',
        description: 'Esporte dos jogos Uni',
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Basquete 3x3',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vôlei indoor',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Futsal',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Handebol',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Atletismo',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Natação',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Futevôlei',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vôlei de areia',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Truco',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dominó',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pôquer',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sinuca',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xadrez',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tênis de mesa',
        description: 'Esporte dos jogos Uni',
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Modalities', null, {});
  }
};
