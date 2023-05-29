'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,        
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      sold:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      inProcessing:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      lotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'lots',
          key: 'id'
        }
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};
