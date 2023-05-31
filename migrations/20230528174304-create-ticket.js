'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      status:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      inProcessing:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      // userId: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references:{
      //     model:'users',
      //     key: 'id'
      //   }
      // },
      batchId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'batchs',
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
