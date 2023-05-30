'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync('admin', 10),
        birthdate: '2000-01-31',
        sex: 'M',
        contact: '(68) 99999-9999',
        cpf: '123456789-99',
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mod',
        email: 'mod@mod.com',
        password: bcrypt.hashSync('mod', 10),
        birthdate: '2000-12-31',
        sex: 'M',
        contact: '(68) 99999-8888',
        cpf: '987654321-99',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maria Joaquina Silva Souza',
        email: 'maria.souza@test.com',
        password: bcrypt.hashSync('maria', 10),
        birthdate: '1999-02-28',
        sex: 'F',
        contact: '(68) 99999-7777',
        cpf: '987654654-99',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jose Henrique Olveira Souza',
        email: 'jose.souza@test.com',
        password: bcrypt.hashSync('jose', 10),
        birthdate: '1999-06-01',
        sex: 'M',
        contact: '(68) 99999-6666',
        cpf: '123456456-99',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
