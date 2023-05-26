'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userrole', [
    {
      userId: 1,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId: 2,
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userrole', null, {});
  }
};
