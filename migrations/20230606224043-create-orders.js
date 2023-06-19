'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      transaction_amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      date_approved: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      first_six_digits: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_four_digits: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      display_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  },
};
