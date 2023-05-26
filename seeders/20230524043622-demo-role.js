'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
    {
      name: 'ADMIN',
      description: 'Administrador',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'USER',
      description: 'Usuario',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'MOD',
      description: 'Moderador',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
