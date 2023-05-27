'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Abimael dafsafaf',
        email: 'aaaaa@example.com',
        password: bcrypt.hashSync('7777777777', 10),
        birthdate: new Date(),
        contact: '9999999',
        cpf: '7777777777',
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ppaalo dafsafaf',
        email: 'pppppp@example.com',
        password: bcrypt.hashSync('7777777776', 10),
        birthdate: new Date(),
        contact: '9999998',
        cpf: '7777777776',
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
