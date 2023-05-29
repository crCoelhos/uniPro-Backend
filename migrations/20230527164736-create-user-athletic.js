'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_athletics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        }
      },
      athleticId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model: 'athletics',
          key: 'id'
        }
      },
      accepted:{
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_athletics');
  }
};