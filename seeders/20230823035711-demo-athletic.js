'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const athleticsData = [
      {
        name: 'A.A.A Imperial',
        college_course: JSON.stringify({
          'Sistemas de Informação': 'UFAC',
          'Sistemas de Informação': 'UNIMETA'
        }),
        direction: 'Alefe',
        img_url: 'imperial.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'A.A.A Bruta',
        college_course: JSON.stringify({
          'Medicina Veterinaria': 'UFAC'
        }),
        direction: 'Akira',
        img_url: 'Akira',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Athletics', athleticsData, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Athletics', null, {});
  }
};